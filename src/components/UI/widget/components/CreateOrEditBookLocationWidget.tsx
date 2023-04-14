import { bookAtoms } from "@/atoms";
import { Button, Error, SpinnerLoader, WidgetHeader } from "@/components";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import bookManagementSchemas from "src/schemas/book-management-schemas";
import type { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBook } from "@/hooks";
const CreateOrEditBookLocationWidget = () => {
  /**
   * component states
   */
  const {
    globalBookState,
    isEditingBookLocationState,
    showCreateOrEditBookLocationWidgetState,
  } = bookAtoms;
  const [globalBook, setGlobalBook] = useRecoilState(globalBookState);
  const [isEditingBookLocation, setIsEditingBookLocation] = useRecoilState(
    isEditingBookLocationState
  );
  const setShowCreateOrEditBookLocationWidget = useSetRecoilState(
    showCreateOrEditBookLocationWidgetState
  );

  const { storeBookLocationMutateAsync, isStoringBookLocation } = useBook();
  const { bookLocationSchema } = bookManagementSchemas;
  type BookLocationSchema = z.infer<typeof bookLocationSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookLocationSchema>({
    resolver: zodResolver(bookLocationSchema),
  });

  /**
   * component function
   */
  const onSubmit: SubmitHandler<BookLocationSchema> = ({
    block,
    shelve,
    row,
  }) => {
    storeBookLocationMutateAsync({
      bookId: globalBook?.id,
      bookLocationData: {
        block,
        row,
        shelve,
      },
    });
  };

  useEffect(() => {
    if (globalBook && isEditingBookLocation) {
      reset({
        block: globalBook?.attributes?.block,
        shelve: globalBook?.attributes?.shelve,
        row: globalBook?.attributes?.row,
      });
    }
  }, [globalBook, isEditingBookLocation, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalBook(null);
          setIsEditingBookLocation(false);
          setShowCreateOrEditBookLocationWidget(false);
          // clearForm();
        }}
        title={
          !isEditingBookLocation
            ? `Create ${globalBook?.attributes?.isbn} location`
            : `Edit ${globalBook?.attributes?.isbn} location`
        }
      />

      {/* body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6  px-2"
      >
        <div className="flex w-full flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide">
          {/* book block */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Block"
                {...register("block", { required: true })}
              />
              <label className="inputLabel">Block</label>

              {errors["block"] && (
                <Error errorMessage={errors["block"].message} />
              )}
            </div>
          </div>

          {/* book shelve */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Shelve"
                {...register("shelve", { required: true })}
              />
              <label className="inputLabel">Shelve</label>

              {errors["shelve"] && (
                <Error errorMessage={errors["shelve"].message} />
              )}
            </div>
          </div>

          {/* book row */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Row"
                {...register("row", { required: true })}
              />
              <label className="inputLabel">Row</label>

              {errors["row"] && <Error errorMessage={errors["row"].message} />}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isEditingBookLocation ? (
                isStoringBookLocation ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isStoringBookLocation ? (
                <SpinnerLoader color="fill-white" />
              ) : (
                "Create"
              )
            }
            type="submit"
            intent="primary"
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditBookLocationWidget;

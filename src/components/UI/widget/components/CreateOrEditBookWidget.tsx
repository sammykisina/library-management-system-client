import { bookAtoms } from "@/atoms";
import {
  Button,
  Error,
  Notifications,
  Select,
  SpinnerLoader,
  WidgetHeader,
} from "@/components";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import type { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookManagementSchemas } from "@/schemas";
import { bookManagementConstants } from "@/constants";
import { appUtils } from "@/utils";
import { useBook } from "@/hooks";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { format, setDate } from "date-fns";

const CreateOrEditBookWidget = () => {
  /**
   * component states
   */
  const {
    globalBookState,
    isEditingBookState,
    showCreateOrEditBookWidgetState,
  } = bookAtoms;
  const {
    isStoringBook,
    storeBookMutateAsync,
    isUpdatingBook,
    updateBookMutateAsync,
  } = useBook();
  const [globalBook, setGlobalBook] = useRecoilState(globalBookState);
  const [isEditingBook, setIsEditingBook] = useRecoilState(isEditingBookState);
  const setShowCreateOrEditBookWidget = useSetRecoilState(
    showCreateOrEditBookWidgetState
  );

  const { generateBookISBN } = appUtils;
  const { bookStatutes } = bookManagementConstants;
  const { bookSchema } = bookManagementSchemas;
  type BookSchema = z.infer<typeof bookSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
  });

  const [selectedBookStatus, setSelectedBookStatus] = useState({
    name: "",
    value: "",
  });
  const [bookISBN, setBookISBN] = useState("");
  const [dateOfPublish, setDateOfPublish] = useState<Date>(new Date());

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<BookSchema> = ({
    author,
    count,
    description,
    name,
    pages,
    price,
    publisher,
    publisherAddress,
  }) => {
    /**
     * validation
     */
    if (bookISBN === "") {
      Notifications.errorNotification(
        "Generate a book isbn or enter one in the input."
      );
      return;
    }

    if (selectedBookStatus.value === "") {
      Notifications.errorNotification("Select the status.");
      return;
    }

    isEditingBook
      ? updateBookMutateAsync({
          bookId: globalBook?.id,
          updateBookData: {
            author,
            count,
            description,
            isbn: bookISBN,
            name,
            pages,
            price,
            publisher,
            status: selectedBookStatus.value,
            publisherAddress,
            dateOfPublish: format(dateOfPublish, "EE, MMM d, yyy"),
          },
        })
      : storeBookMutateAsync({
          author,
          count,
          description,
          isbn: bookISBN,
          name,
          pages,
          price,
          publisher,
          status: selectedBookStatus.value,
          publisherAddress,
          dateOfPublish: format(dateOfPublish, "EE, MMM d, yyy"),
        });
  };

  useEffect(() => {
    if (globalBook && isEditingBook) {
      reset({
        name: globalBook?.attributes?.name,
        author: globalBook?.attributes?.author,
        publisher: globalBook?.attributes?.publisher,
        publisherAddress: globalBook?.attributes?.publisherAddress,
        price: globalBook?.attributes?.price.toString(),
        description: globalBook?.attributes?.description,
        count: globalBook?.attributes?.count.toString(),
        pages: globalBook?.attributes?.pages.toString(),
      });

      setBookISBN(globalBook?.attributes?.isbn);

      setSelectedBookStatus({
        name: globalBook?.attributes?.status,
        value: globalBook?.attributes?.value,
      });

      setDateOfPublish(new Date(globalBook?.attributes?.dateOfPublish));
    }
  }, [isEditingBook, globalBook, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalBook(null);
          setIsEditingBook(false);
          setShowCreateOrEditBookWidget(false);
          // clearForm();
        }}
        title={!isEditingBook ? "Create A Book." : "Update A Book."}
      />

      {/* body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 overflow-y-scroll px-2"
      >
        <div className="flex h-[30rem] w-full flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide">
          {/* book isbn generation */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  className="input peer"
                  placeholder="Book ISBN"
                  value={bookISBN}
                  onChange={(event) => setBookISBN(event.target.value)}
                />

                <Button
                  type="button"
                  title="Generate"
                  intent="primary"
                  form="small"
                  purpose={() => setBookISBN(generateBookISBN())}
                />

                <label className="inputLabel">Book ISBN</label>
              </div>
            </div>
          </div>

          {/* book name and author  */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <label className="inputLabel">Name</label>

              {errors["name"] && (
                <Error errorMessage={errors["name"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Author"
                {...register("author", { required: true })}
              />
              <label className="inputLabel">Author</label>

              {errors["author"] && (
                <Error errorMessage={errors["author"].message} />
              )}
            </div>
          </div>

          {/* publisher and year of publish */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Publisher"
                {...register("publisher", { required: true })}
              />
              <label className="inputLabel">Publisher</label>

              {errors["publisher"] && (
                <Error errorMessage={errors["publisher"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Publisher Address"
                {...register("publisherAddress", { required: true })}
              />
              <label className="inputLabel">Publisher Address</label>

              {errors["publisherAddress"] && (
                <Error errorMessage={errors["publisherAddress"].message} />
              )}
            </div>

            <div>
              <label className="text-secondary/50 ">Date Of Publish</label>
              <Calendar
                date={dateOfPublish}
                maxDate={new Date()}
                onChange={(date: Date) => setDateOfPublish(date)}
              />
            </div>
          </div>

          {/* count and no of pages */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="number"
                className="input peer"
                placeholder="No of Books"
                {...register("count", { required: true })}
              />
              <label className="inputLabel">No of Books</label>

              {errors["count"] && (
                <Error errorMessage={errors["count"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                className="input peer"
                placeholder="No Of Pages"
                {...register("pages", { required: true })}
              />
              <label className="inputLabel">No Of Pages</label>

              {errors["pages"] && (
                <Error errorMessage={errors["pages"].message} />
              )}
            </div>
          </div>

          {/* price and status */}
          <div className="flex flex-row items-center justify-between  rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="number"
                className="input peer"
                placeholder="Book Price"
                {...register("price", { required: true })}
              />
              <label className="inputLabel">Book Price</label>

              {errors["price"] && (
                <Error errorMessage={errors["price"].message} />
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-secondary">Status</span>
              <Select
                multiple={false}
                options={bookStatutes}
                select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-[10rem]"
                select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                selected={selectedBookStatus}
                setSelected={setSelectedBookStatus}
              />
            </div>
          </div>

          {/* book description */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Book Description"
                {...register("description", { required: true })}
              />
              <label className="inputLabel">Book Description</label>

              {errors["description"] && (
                <Error errorMessage={errors["description"].message} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isEditingBook ? (
                isUpdatingBook ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isStoringBook ? (
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

export default CreateOrEditBookWidget;

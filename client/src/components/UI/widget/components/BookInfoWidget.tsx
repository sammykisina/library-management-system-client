import { bookAtoms } from "@/atoms";
import { Icon, Title, WidgetHeader } from "@/components";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BsExclamationLg } from "react-icons/bs";
import { format } from "date-fns";

const BookInfoWidget = () => {
  /**
   * component states
   */
  const { globalBookState, showBookInfoWidgetState } = bookAtoms;
  const [globalBook, setGlobalBook] = useRecoilState(globalBookState);
  const setShowBookInfoWidget = useSetRecoilState(showBookInfoWidgetState);
  /**
   * component functions
   */
  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalBook(null);
          setShowBookInfoWidget(false);
          // clearForm();
        }}
        title={globalBook?.attributes?.isbn + ` Information.`}
      />

      <div className="flex flex-col gap-2 py-3 px-2">
        {/* into */}
        <div className="flex flex-col gap-y-5 divide-y divide-primary rounded-md border border-primary/10 py-4 px-2">
          {/* title and description */}
          <div>
            <span className="text-lg font-bold">
              {globalBook?.attributes?.name}
            </span>

            <p className="ml-3 text-secondary/50 first-letter:capitalize">
              {globalBook?.attributes?.description}
            </p>
          </div>

          {/* author and publisher info */}
          <div className="px-2 py-2">
            <div>
              <span>Author: </span>
              <span className="font-bold text-secondary/50">
                {globalBook?.attributes?.author}
              </span>
            </div>

            <p className="mt-1 bg-primary text-center">
              punished by : {globalBook?.attributes?.publisher} On{" "}
              {globalBook?.attributes?.dateOfPublish &&
                format(
                  new Date(globalBook?.attributes?.dateOfPublish),
                  "EE, MMM d, yyy"
                )}
            </p>

            <div className="mt-5">
              Published In: {globalBook?.attributes?.publisherAddress}
            </div>
          </div>
        </div>

        {/* inventory book info */}
        <div className="divide-y-2 divide-primary rounded-md border border-primary/10 py-4 px-2">
          <div className="flex flex-col gap-y-5 pb-3">
            <Title title="Inventory Book Information." />

            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-2">
                  <span>Copies Count:</span>
                  <span>
                    <span className="font-bold">
                      {globalBook?.attributes?.count}
                    </span>{" "}
                    (total)
                  </span>
                </div>

                <div className="flex gap-2">
                  <span>Current Copies Count:</span>
                  <span>
                    <span className="font-bold">
                      {globalBook?.attributes?.currentCount}
                    </span>
                  </span>
                </div>
              </div>

              <div className="relative">
                {globalBook?.attributes?.status === "readin" ? (
                  <span className="rounded-full bg-red-100 px-2 text-secondary">
                    Cannot Not Be Borrowed
                  </span>
                ) : (
                  <span className="rounded-full bg-green-100 px-2 text-secondary">
                    Can be Borrowed.
                  </span>
                )}
                <div className=" absolute -top-2 -left-3 h-4 w-4 animate-ping rounded-full bg-green-500" />
              </div>
            </div>

            <div className="flex items-center">
              <Icon
                icon={<BsExclamationLg className="icon" />}
                iconWrapperStyles="bg-red-500 text-white p-2 rounded-full"
              />
              <p className="mt-1 rounded-l-full bg-red-500 px-3 text-center text-white">
                This book is to be replaced with :{" "}
                {globalBook?.attributes?.price} (USD) incase current borrower
                lost it.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            Book Located In:{" "}
            <div className="flex flex-col">
              <span>Block: {globalBook?.attributes?.block}</span>
              <span>Shelve: {globalBook?.attributes?.shelve}</span>
              <span>Row: {globalBook?.attributes?.row}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookInfoWidget;

const generateBookISBN: () => string = () => {
  const ISBNLoops = 4;
  let ISBN = "";
  for (let index = 0; index <= ISBNLoops; index++) {
    const number = Math.floor(Math.random() * 1000);
    ISBN = ISBN + number;
  }

  return "ISBN-" + generateNumberWithDashes(ISBN);
};

const generateNumberWithDashes: (number: string) => string = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, "-");
};

const generateAvatar: (name: string) => string = (name) =>
  `https://ui-avatars.com/api/?name=${name}&background=170140&color=fff&bold=true&font-size=0.33`;

const borrowCount = (borrows: [], bookISBN: string) =>
  borrows?.filter((borrow: any) => borrow?.attributes?.isbn == bookISBN).length;

const appUtils = {
  generateAvatar,
  generateBookISBN,
  borrowCount,
};

export default appUtils;

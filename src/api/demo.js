// Function to paginate an array
const paginateArray = (array, page = 1, itemsPerPage = 10) => {
    // Calculate the starting index of the current page
    const startIndex = (page - 1) * itemsPerPage;
    
    // Slice the array to get the items for the current page
    const paginatedArray = array.slice(startIndex, startIndex + itemsPerPage);
    
    return paginatedArray;
  };
  
  // Sample array
  const sampleArray = Array.from({ length: 3 }, (_, i) => `Item ${i + 1}`);
  
  // Example of paginating the array
  const currentPage =2;
  const itemsPerPage = 2;
  const paginatedResult = paginateArray(sampleArray, currentPage, itemsPerPage);
  
  console.log(paginatedResult); // Shows the items for the second page
  
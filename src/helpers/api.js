import axios from 'axios';

let currentPage;
let collectedBlocks;

async function apiCall(channel, page) {
  let res = await axios.get(`https://api.are.na/v2/channels/${channel}?per=100&page=${page}`);
  let data = await res.data;
  return data;
}

export const getArenaChannel = (url, page) => {
  return new Promise((resolve, reject) => {
    currentPage = page;
    let pageCount;

    let slug = url;

    apiCall(url, currentPage)
      .then(data => {
        const originalChannelData = data;
        collectedBlocks = data.contents;

        pageCount = Math.ceil(data.length / data.per);

        console.log(pageCount);

        // resolve({ collectedBlocks: collectedBlocks, originalChannelData: originalChannelData })

        if (pageCount > 1) {
          for (let i = currentPage; i < pageCount; i++) {
            currentPage++;
            apiCall(url, currentPage)
              .then(data => {
                collectedBlocks = [...collectedBlocks, ...data.contents]

                resolve({
                  collectedBlocks: collectedBlocks,
                  originalChannelData: originalChannelData
                });
              });
          }
        } else {
          resolve({
            collectedBlocks: collectedBlocks,
            originalChannelData: originalChannelData
          });
        }
      });
  });
}
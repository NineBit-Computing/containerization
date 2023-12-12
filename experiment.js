const taskIds = [1,2,3];
const computedResult = {};

async function abc() {
  return new Promise((resolveTop, rejectTop) => {
    for (const taskId of taskIds) {
      const defer = async() => {
        return api(taskId);
      }
  
      setTimeout(async () => {
        defer()
        .then((data) => {
          console.log(taskId, 'data = ', data);
          computedResult[taskId] = data;
        }).catch((err) => {
            console.log(taskId, 'err = ', err);
            computedResult[taskId] = err;
        })
        .finally(() => {
          if (Object.keys(computedResult).length === taskIds.length) {
            resolveTop('All Success');
          }
        })
      }, 0);
    }
  })
}

function api(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 2) {
        reject(`Server Error for: ${id}`);
      } else {
        resolve(`API success for: ${id}`);
      }
    }, Math.floor(Math.random() * 1000));
  });
}

async function test() {
  console.log('* Start *');
  await abc();
  console.log('# Stop #');
}

test();
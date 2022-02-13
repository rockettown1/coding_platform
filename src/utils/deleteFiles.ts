import fs from "fs";

/**
 *Deletes file(s) from the file system
 * @param files an array of file paths
 */
export const deleteFiles = (files: string[]) => {
  try {
    files.forEach((path) => {
      fs.unlink(path, (err) => {
        if (err) console.log(err);
        else {
          console.log(`deleted file ${path}`);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

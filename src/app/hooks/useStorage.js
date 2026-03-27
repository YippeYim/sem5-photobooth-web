import { supabase } from "../../lib/supabase";
import { CONSTANTS } from "../../lib/constants";

export const useStorage = () => {

  async function getAllImageUrlFromFolder(folderName, bucketName = CONSTANTS.BUCKET_NAME) {
    const { data, error } = await supabase.storage
      .from(bucketName) // Replace with your bucket name
      .list(folderName, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error("Error fetching images:", error);
      return [];
    }

    console.info(data);
    return data
      .filter((file) => file.name !== ".emptyFolderPlaceholder")
      .map((file) => {
        const {
          data: { publicUrl },
        } = supabase.storage
          .from(bucketName)
          .getPublicUrl(`${folderName}/${file.name}`); // Matches '1-people/image.jpg'

        return publicUrl;
      });
  }

  return { getAllImageUrlFromFolder };
};

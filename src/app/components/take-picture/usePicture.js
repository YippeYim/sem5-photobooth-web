/**
 * @returns 
 * function downloadPicture
 * 
 * function sharePicture
 * 
 * function createTestFile -> demo file using in sharePicture()
 * 
 */

export function usePicture() {
    
    const downloadPicture = async ( pictureUrl ) => {
      // 1. Fetch the real image data
      const response = await fetch(pictureUrl);
      const blob = await response.blob();
      
      // 2. Create a temporary "Blob URL"
      const blobUrl = URL.createObjectURL(blob);
      
      // 3. Create a hidden <a> tag
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = "captured-photo.jpg"; // The name the user sees
      
      // 4. Trigger the click
      document.body.appendChild(link);
      link.click();
      
      // 5. Cleanup: Remove the link and free the memory
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      
      console.log("Download triggered successfully!");
    }

    
    const sharePicture = async ( photoUrl, photoFile) => {
        // Check if the browser supports the Share API
        if (navigator.canShare && navigator.canShare({ files: [photoFile] })) {
          try {
            await navigator.share({
              files: [photoFile],
              title: 'My Photo',
              text: 'Check out this photo!',
            });
          } catch (err) {
            console.log("User cancelled or share failed", err);
          }
        } else {
          // Fallback: Just download it if sharing isn't supported
          const link = document.createElement('a');
          link.href = photoUrl;
          link.download = 'captured-photo.png';
          link.click();
        }
    };
    
    const createTestFile = async () => {
      // Fetch a real placeholder image
      const response = await fetch("https://www.shutterstock.com/image-illustration/live-demo-symbol-concept-word-600nw-2576676555.jpg");
      const blob = await response.blob();
      
      // Turn that blob into a File object
      const realFile = new File([blob], "real-test.jpg", { type: "image/jpeg" });
      
      console.log("Mock file created:", realFile);
      return realFile;
    };

    
    return { downloadPicture , sharePicture , createTestFile }
}
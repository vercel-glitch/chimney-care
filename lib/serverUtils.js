import path from "path";

const folderPath = path.join(process.cwd(), "public/json");

export const checkAPIJson = async ({ filePath }) => {
  try {
    const { promises: fs } = await import("fs");
    const fullFilePath = path.join(folderPath, filePath);

    // Check if file exists
    const fileStats = await fs.stat(fullFilePath).catch(() => false);
    if (!fileStats) {
      return null;
    }

    // Check if file is too old (optional: 24 hours cache expiry)
    const fileAge = Date.now() - fileStats.mtime.getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    if (fileAge > maxAge) {
      // Cache expired - file is older than 24 hours
      // Optionally delete expired cache
      // await fs.unlink(fullFilePath).catch(() => {});
      // return null;
    }

    const response = await fs.readFile(fullFilePath, "utf-8");
    const parsedData = JSON?.parse(response);
    
    // Validate that the data is not empty
    if (!parsedData || (parsedData.data && Array.isArray(parsedData.data) && parsedData.data.length === 0)) {
      return null;
    }

    return parsedData;
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return null;
  }
};

export const saveJson = async ({ filePath, data }) => {
  try {
    const { promises: fs } = await import("fs");
    const fullFilePath = path.join(folderPath, filePath);
    await fs.mkdir(path.dirname(fullFilePath), { recursive: true });
    await fs.writeFile(fullFilePath, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.error("Error writing JSON file:", err);
    return null;
  }
};

export const deleteJson = async ({ filePath }) => {
  try {
    const { promises: fs } = await import("fs");
    const fullFilePath = path.join(folderPath, filePath);

    // Check if file exists before trying to delete
    if (await fs.stat(fullFilePath).catch(() => false)) {
      await fs.unlink(fullFilePath);
      return true;
    } else {
      return true; // Return true since the goal (file not existing) is achieved
    }
  } catch (err) {
    console.error("Error deleting JSON file:", err);
    return false;
  }
};

// Clear all cache for a domain
export const clearDomainCache = async ({ domain }) => {
  try {
    const { promises: fs } = await import("fs");
    const domainPath = path.join(folderPath, domain);
    
    if (await fs.stat(domainPath).catch(() => false)) {
      await fs.rmdir(domainPath, { recursive: true });
      return true;
    }
    return true;
  } catch (err) {
    console.error("Error clearing domain cache:", err);
    return false;
  }
};

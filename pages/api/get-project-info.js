export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Project ID is required",
      });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/get_project_info/${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch project info: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching project info:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch project information",
      error: error.message,
    });
  }
}

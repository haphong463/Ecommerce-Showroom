using System;

namespace API.Helper
{
    public static class FileUpload
    {
        static readonly string baseFolder = "Uploads";
        static readonly string rootUrl = "http://localhost:5251/";
        public static string SaveImage(string folder, IFormFile image)
        {
            string imageName = Guid.NewGuid().ToString() + "_" + image.FileName;
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), $"{baseFolder}\\{folder}");

            if (!Directory.Exists(filepath))
            {
                Directory.CreateDirectory(filepath);
            }
            var exactpath = Path.Combine(Directory.GetCurrentDirectory(), $"{baseFolder}\\{folder}", imageName);

            using (var fileSystem = new FileStream(exactpath, FileMode.Create))
            {
                image.CopyTo(fileSystem);
            }
            return rootUrl + baseFolder + "/" + folder + "/" + imageName;
        }
        public static void DeleteImage(string imageName, IWebHostEnvironment env)
        {
            int index = imageName.IndexOf("http://localhost:5251/");
            string result = imageName.Substring(index + "http://localhost:5251/".Length);
            var filePath = Path.Combine(env.ContentRootPath, result);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }
    }
}

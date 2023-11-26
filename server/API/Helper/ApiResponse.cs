using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc;

namespace API.Helper
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }
        public int Status { get; set; }
        public List<string> Errors { get; set; }

        public ApiResponse(T data, string message = "", int status = 200)
        {
            Data = data;
            Message = message;
            Status = status;
            Errors = new List<string>();
        }
        public static ActionResult BadRequest(ModelStateDictionary modelState)
        {
            var errors = modelState.Values.SelectMany(v => v.Errors)
                                          .Select(e => e.ErrorMessage)
                                          .ToList();
            var response = new ApiResponse<T>(default, "Invalid data", 400)
            {
                Errors = errors
            };
            return new BadRequestObjectResult(response);
        }
        public static ActionResult Exception(Exception ex)
        {
            var response = new ApiResponse<T>(default, ex.Message, 500)
            {
                Errors = new List<string> { ex.ToString() } // For detailed error, use ex.ToString()
            };
            return new ObjectResult(response) { StatusCode = StatusCodes.Status500InternalServerError };
        }
    }
}

namespace WebAppWithAjaxModals.Models
{
    public class JsonResponse
    {
        public JsonResponse(bool isSuccess, string message = null)
        {
            Success = isSuccess;
            Message = message;
        }

        public bool Success { get; }
        public string Message { get; }
    }
}
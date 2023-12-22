using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Helper
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<Vehicle, VehicleDTO>()
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images!.Select(x => new ImageDTO
                {
                    ImageId = x.ImageId,
                    ImagePath = x.ImagePath!
                }).ToList()))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => new Vehicle_BrandDTO
                {
                    BrandId = src.Brand!.BrandId,
                    Name = src.Brand.Name,

                }))
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails!.Select(x => new Vehicle_OrderDetail_DTO
                {
                    OrderId = x.OrderId,
                    Quantity = x.Quantity
                }).ToList()))
                .ForMember(dest => dest.Frames, opt => opt.MapFrom(src => src.Frames!.Select(x => new Vehicle_Frame_DTO
                {
                    Id = x.Id,
                    FrameNumber = x.FrameNumber,
                    ReceivingOrderId = x.ReceivingOrderId,
                    VehicleId = x.VehicleId
                }).ToList()))
                .ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
            CreateMap<Account, AccountDTO>().ReverseMap();
            CreateMap<Employee, EmployeeDTO>().ReverseMap();

            /*CreateMap<Order, OrderBriefDTO>();
            CreateMap<OrderDetails, OrderDetailDTO>();
            CreateMap<OrderService, OrderServiceDTO>();
            CreateMap<Vehicle, include_VehicleDTO>();*/

            CreateMap<Order, OrderBriefDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderDTO, Order>().ReverseMap();

            CreateMap<Service, ServiceDTO>().ReverseMap();
            CreateMap<ServiceDTO, Service>().ReverseMap();
            CreateMap<Service, ServiceBriefDTO>().ReverseMap();

            //CreateMap<Vehicle, VehicleDTO>().ReverseMap();
            //CreateMap<VehicleDTO, Vehicle>().ReverseMap();
            CreateMap<VehicleBriefDTO, Vehicle>().ReverseMap();

            CreateMap<RegistrationData, RegistrationDataDTO>().ReverseMap();
            CreateMap<RegistrationDataDTO, RegistrationData>().ReverseMap();

            CreateMap<ReceivingOrder, ReceivingOrderDTO>().ReverseMap();
            CreateMap<FrameBrief, Frame>().ReverseMap();

            CreateMap<OrderCompanyBrief, OrderCompany>().ReverseMap();
            CreateMap<OrderCompany, OrderCompanyDTO>()
                .ForMember(dest => dest.Vehicle, opt => opt.MapFrom(src => new include_VehicleDTO
                {
                    VehicleId = src.Vehicle!.VehicleId,
                    Name = src.Vehicle.Name,
                    Price = (decimal)src.Vehicle.Price,
                    Quantity = (int)src.Vehicle.Quantity,
                    BrandId = src.Vehicle.BrandId,
                    ModelId = src.Vehicle.ModelId,
                }))
                .ForMember(dest => dest.Employee, opt => opt.MapFrom(src => new EmployeeDTO
                {
                    EmployeeId = src.Employee!.EmployeeId,
                    Name = src.Employee.Name,
                }))
                .ReverseMap();

            CreateMap<AppointmentBrief, Appointment>().ReverseMap();
            CreateMap<Appointment, AppointmentDTO>()
                .ForMember(dest => dest.Vehicles, opt => opt.MapFrom(src => new include_VehicleDTO
                {
                    VehicleId = src.Vehicles!.VehicleId,
                    Name = src.Vehicles.Name,
                    Price = src.Vehicles.Price,
                    Quantity = (int)src.Vehicles.Quantity,
                    BrandId = src.Vehicles.BrandId,
                    ModelId = src.Vehicles.ModelId,
                }))
                .ForMember(dest => dest.Accounts, opt => opt.MapFrom(src => new AccountDTO
                {
                    AccountId = src.Accounts!.AccountId,
                    Name = src.Accounts.Name,
                }))
                .ReverseMap();

        }
    }
}

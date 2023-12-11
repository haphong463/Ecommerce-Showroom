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
                .ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
            CreateMap<Account, AccountDTO>().ReverseMap();
            CreateMap<Employee, EmployeeDTO>().ReverseMap();

            CreateMap<Order, OrderBriefDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderDTO, Order>().ReverseMap();

            CreateMap<Service, ServiceDTO>().ReverseMap();
            CreateMap<ServiceDTO, Service>().ReverseMap();
            CreateMap<Service, ServiceBriefDTO>().ReverseMap();

            CreateMap<Vehicle, VehicleDTO>().ReverseMap();
            CreateMap<VehicleDTO, Vehicle>().ReverseMap();
            CreateMap<Vehicle, VehicleBriefDTO>().ReverseMap();
        }
    }
}

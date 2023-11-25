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
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => new BrandDTO
                {
                    BrandId = src.Brand!.BrandId,
                    Name = src.Brand.Name,
                    Description = src.Brand.Description,
                    ImagePath = src.Brand.ImagePath!,
                }))
                .ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
        }
    }
}

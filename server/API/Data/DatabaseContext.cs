using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Vehicle>()
                .HasMany(x => x.Images)
                .WithOne(x => x.Vehicle)
                .HasForeignKey(x => x.VehicleId);
            modelBuilder.Entity<Brand>()
                .HasMany(x => x.Vehicles)
                .WithOne(x => x.Brand)
                .HasForeignKey(x => x.BrandId);

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(a => a.AccountId);
                entity.HasMany(e => e.Order)
                    .WithOne(e => e.Account)
                    .HasForeignKey(e => e.AccountId);
            });
            modelBuilder.Entity<Employee>()
                .HasMany(x => x.Order)
                .WithOne(x => x.Employee)
                .HasForeignKey(x => x.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<OrderService>()
            //    .HasKey(ot => new { ot.OrderId, ot.ServiceId });
            //modelBuilder.Entity<OrderService>()
            //    .HasOne(ot => ot.Orders)
            //    .WithMany(o => o.OrderServices)
            //    .HasForeignKey(ot => ot.OrderId)
            //.OnDelete(DeleteBehavior.Restrict);
            //modelBuilder.Entity<OrderService>()
            //  .HasOne(ot => ot.Services)
            //  .WithMany(p => p.OrderServices)
            //  .HasForeignKey(ot => ot.ServiceId)
            //  .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<OrderDetails>()
            //    .HasKey(ot => new { ot.OrderId, ot.VehicleId });
            //modelBuilder.Entity<OrderDetails>()
            //    .HasOne(ot => ot.Orders)
            //    .WithMany(o => o.OrderDetails)
            //    .HasForeignKey(ot => ot.OrderId)
            //.OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
        .HasMany(o => o.OrderDetails)
        .WithOne(od => od.Orders)
        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderServices)
                .WithOne(os => os.Orders)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Frame>()
    .HasOne(f => f.Vehicle)
    .WithMany(v => v.Frames)
    .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ReceivingOrder>()
                .HasMany(ro => ro.Frame)
                .WithOne(f => f.ReceivingOrder)
                .HasForeignKey(f => f.ReceivingOrderId)
                .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<OrderDetails>()
            //  .HasOne(ot => ot.Vehicles)
            //  .WithMany(p => p.OrderDetailsDTO)
            //  .HasForeignKey(ot => ot.VehicleId)
            //  .OnDelete(DeleteBehavior.Restrict);
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<OrderService> OrderServices { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<RegistrationData> RegistrationDatas { get; set; }
        public DbSet<ReceivingOrder> ReceivingOrders { get; set; }
        public DbSet<OrderCompany> OrderCompanies { get; set; }
        public DbSet<Frame> Frames { get; set; }
    }
}

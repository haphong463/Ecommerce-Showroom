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

            modelBuilder.Entity<Account>()
                .HasMany(x => x.Order)
                .WithOne(x => x.Account)
                .HasForeignKey(x => x.AccountId);
            modelBuilder.Entity<Employee>()
                .HasMany(x => x.Order)
                .WithOne(x => x.Employee)
                .HasForeignKey( x => x.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }

    }
}

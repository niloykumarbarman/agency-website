using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgencyWebsite.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTechnologyDisplayName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "TechnologyItems",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "TechnologyItems");
        }
    }
}

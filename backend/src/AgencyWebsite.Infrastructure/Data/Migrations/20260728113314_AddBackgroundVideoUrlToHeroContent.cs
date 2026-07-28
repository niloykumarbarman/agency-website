using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgencyWebsite.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBackgroundVideoUrlToHeroContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BackgroundVideoUrl",
                table: "HeroContents",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundVideoUrl",
                table: "HeroContents");
        }
    }
}

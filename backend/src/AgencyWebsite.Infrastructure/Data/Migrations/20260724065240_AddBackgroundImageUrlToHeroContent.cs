using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgencyWebsite.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBackgroundImageUrlToHeroContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BackgroundImageUrl",
                table: "HeroContents",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundImageUrl",
                table: "HeroContents");
        }
    }
}

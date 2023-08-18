using ChatService.Hubs;
using ChatService.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSignalR();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", 
        builder =>
        {
            builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();

        });
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opt => new Dictionary<string,UserConnection>());


var app = builder.Build();



if(app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseEndpoints
    (endpoints =>
        {
            endpoints.MapHub<ChatHub>("/chat");
        }
    );


app.Run();

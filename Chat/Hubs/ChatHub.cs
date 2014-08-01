using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;


// http://www.asp.net/signalr/overview/signalr-20/hubs-api/hubs-api-guide-server#multiplehubs

namespace Chat.Hubs
{
   
    public class ChatHub : Hub
    {
        public readonly static ConnectionMapping<string> _connections =
        new ConnectionMapping<string>();

        public override Task OnConnected()
        {                  
            string name =   Context.QueryString["username"];
            _connections.Add(name, Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            string name = Context.QueryString["username"];
            _connections.Remove(name, Context.ConnectionId);
            return base.OnDisconnected();
        }

        public override Task OnReconnected()
        {
            string name = Context.User.Identity.Name;

            if (!_connections.GetConnections(name).Contains(Context.ConnectionId))
            {
                _connections.Add(name, Context.ConnectionId);
            }
            return base.OnReconnected();
        }

        public void Sendmessage(string name, string message)
        {
            
            // Call the addNewMessageToPage method to update clients.
            Clients.All.addNewMessageToPage(name, message);
        }

        // Remember Camel Casing from javascript to C#
        public string SendPrivateMessageToUser(string name, string message, string connectionId)
        {
            // Call the addNewMessageToPage method to update clients.
            Clients.Client(connectionId).addNewMessageToPage(name, message);
            return ("Message sent to " + name);
        }


    }
}
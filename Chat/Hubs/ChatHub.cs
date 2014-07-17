using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Chat.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        //public override Task OnConnected()
        //{
        //    // Add your own code here.
        //    // For example: in a chat application, record the association between
        //    // the current connection ID and user name, and mark the user as online.
        //    // After the code in this method completes, the client is informed that
        //    // the connection is established; for example, in a JavaScript client,
        //    // the start().done callback is executed.
        //    string connectionID = Context.ConnectionId;
        //    return base.OnConnected();
        //}


        //public override Task OnDisconnected()
        //{
        //    // Add your own code here.
        //    // For example: in a chat application, mark the user as offline, 
        //    // delete the association between the current connection id and user name.
        //    return base.OnDisconnected();
        //}

        //public override Task OnReconnected()
        //{
        //    // Add your own code here.
        //    // For example: in a chat application, you might have marked the
        //    // user as offline after a period of inactivity; in that case 
        //    // mark the user as online again.
        //    return base.OnReconnected();
        //}

        private readonly static ConnectionMapping<string> _connections =
           new ConnectionMapping<string>();



        public override Task OnConnected()
        {
            string name = Context.User.Identity.Name;

            _connections.Add(name, Context.ConnectionId);

            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            string name = Context.User.Identity.Name;

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
    }
}
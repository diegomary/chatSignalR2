using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chat.Hubs
{
    public class UserChat
    {
        public string Name { get; set; }
        public string ConnectionId { get; set; }
    }

    public class ConnectionMapping<T>
    {
        private readonly Dictionary<T, HashSet<string>> _connections =new Dictionary<T, HashSet<string>>();

        public int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        public List<T>  GetAllConnectedUserNames()
        {
            return _connections.Select(temp => temp.Key).ToList();
        }

        public List<UserChat> GetAllConnectedUser()
        {
            List<UserChat> result = new List<UserChat>();
            foreach (var temp in _connections)
            {
                result.Add(new UserChat{ Name= temp.Key.ToString(), ConnectionId =temp.Value.FirstOrDefault()});
            }
            return result;
        }

        public void Add(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    connections = new HashSet<string>();
                    _connections.Add(key, connections);
                }

                lock (connections)
                {
                    connections.Add(connectionId);
                }
            }
        }

        public IEnumerable<string> GetConnections(T key)
        {
            HashSet<string> connections;
            if (_connections.TryGetValue(key, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public void Remove(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    //connections.Remove(connectionId);
                    connections.Clear();
                    //if (connections.Count == 0)
                    //{
                        _connections.Remove(key);
                   // }
                }
            }
        }
    }
}
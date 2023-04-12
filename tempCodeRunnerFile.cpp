#include <iostream>
#include <limits.h>
#include <vector>
using namespace std;
#define V 9

int minDistance(int distance[], bool visited[])
{
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (visited[v] == false && distance[v] <= min)
            min = distance[v], min_index = v;
    return min_index;
}

void printPath(vector<int>& path, int src, int dest)
{
    if (path.empty())
    {
        cout << "No path from " << src << " to " << dest << endl;
        return;
    }
    cout << "Shortest path from " << src << " to " << dest << ": ";
    cout << path[0];
    for (int i = 1; i < path.size(); i++)
    {
        if (path[i] != path[i - 1])
        {
            cout << " -> " << path[i];
        }
    }
    cout << endl;
}


void printSolution(int distance[], vector<int> path)
{
    int idx = 0;
    cout << "Which vertex's distance and shortest path you want to find out? Choose between 0-8." << endl;
    cin >> idx;
    cout << "The shortest distance for vertex " << idx << " is " << distance[idx] << endl;
    cout << "The shortest path for vertex " << idx << " is: ";
    printPath(path, 0, idx);
    cout << endl;
}

void dijkstra(int graph[V][V], int src)
{
    int distance[V];
    vector<int> path;
    bool visited[V];

    for (int i = 0; i < V; i++) {
        distance[i] = INT_MAX;
        visited[i] = false;
    }

    distance[src] = 0;
    path.push_back(src);

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(distance, visited);
        visited[u] = true;

        for (int v = 0; v < V; v++)
            if (!visited[v] && graph[u][v] && distance[u] != INT_MAX && distance[u] + graph[u][v] < distance[v]) {
                distance[v] = distance[u] + graph[u][v];
                path.push_back(u);
            }
    }

    printSolution(distance, path);
}

int main()
{
    int graph[V][V] = {
        { 0, 4, 0, 0, 0, 0, 0, 8, 0 },
        { 4, 0, 8, 0, 0, 0, 0, 11, 0 },
        { 0, 8, 0, 7, 0, 4, 0, 0, 2 },
        { 0, 0, 7, 0, 9, 14, 0, 0, 0 },
        { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
        { 0, 0, 4, 14, 10, 0, 2, 0, 0 },
        { 0, 0, 0, 0, 0, 2, 0, 1, 6 },
        { 8, 11, 0, 0, 0, 0, 1, 0, 7 },
        { 0, 0, 2, 0, 0, 0, 6, 7, 0 }
    };

    dijkstra(graph, 0);

    return 0;
}

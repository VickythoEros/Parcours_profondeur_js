export default class Graph{
    constructor(noOfVertices)
    {
      this.noOfVertices = noOfVertices;
      this.adjList = new Map();
      
    }
    
    addVertex(v)
    {
      this.adjList.set(v,[]);
    }
    
    addEdge(v, w)
    {
      //this.adjList.get(v).push(w);
      this.adjList.get(w).push(v); // doing for undirected Graph
    }
    
    
    printGraph()
    {
      let keys = this.adjList.keys();
      for(let v of keys)
      {
        let eList = this.adjList.get(v);
        let data = '';
        for(let e in eList)
        {
          data = data + eList[e] + ' ';
        }
        console.log(v + '->' + data);
      }
    }
    
    
    dfs(v)
    { // depth first traversal
      
      let visited = []; // let visited = new Array();
      let keys = this.adjList.keys();
      for(let v of keys)
      {
        visited[v] = false;
      }
      

      this.dfsRecu(v, visited);
    }


    
    dfsRecu(v, visited)
    {
      let eList = this.adjList.get(v);
      visited[v] = true;
      console.log(v)
      for(let eData in eList)

      {
        let e = eList[eData];
        if(!visited[e])
        {
          visited[e] = true;
          this.dfsRecu(e, visited);
        }
       
      }
    }
    
    
  }
  
/*

  var g = new Graph();

  g.addVertex('A');
  g.addVertex('B');
  g.addVertex('C');
  g.addVertex('D');
  g.addVertex('E');
  g.addVertex('F');
  g.addVertex('G');
  g.addVertex('H');
  
  g.addEdge('A', 'B');
  g.addEdge('A', 'C');
  g.addEdge('B','A');
  g.addEdge('B','D');
  g.addEdge('B','E');
  g.addEdge('C','A');
  g.addEdge('C','D');
  g.addEdge('D','B');
  g.addEdge('D','C');
  g.addEdge('D','E');
  g.addEdge('E','B');
  g.addEdge('E','F');
  g.addEdge('E','D');
  g.addEdge('E','G');
  g.addEdge('F','G');
  g.addEdge('F','E');
  g.addEdge('G','E');
  g.addEdge('G','F');
  g.addEdge('G','H');
  g.addEdge('H','G');


  
  g.printGraph();
  
  console.log('Depth First Traversal');
  g.dfs('G');
  
    */

var dataGraphServer ;




class Graph{
  constructor(noOfVertices)
  {
    // declaration des variables
    this.noOfVertices = noOfVertices;
    this.adjList = new Map();
    this.couleur =  new Map(); // une map destinée a contenir tous les sommets avec leur couleur
    this.P = new Map();
    this.Q = [];
    this.fermer = [];
    this.sommetInit;

  }
  
  // permet l'ajout des sommets
  addVertex(v)
  {
    this.adjList.set(v,[]);
  }
  
  //permet de creer les arrets
  addEdge(v, w)
  {
    //this.adjList.get(v).push(w);
    this.adjList.get(w).push(v); // doing for undirected Graph
  }

  // permet l'ajout du premier sommet a la pile
  addFirst(s)
  {
    this.fermer.push(s)
  }
 
  // affiche le graphe
  printGraph()
  {
    let keys = this.adjList.keys();


      //ajout des couleurs aux sommets
      for(let v of keys)
      {
          this.couleur.set(v,'blanc');
      }

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
  
  // la fonction du parcours en profondeur( Depth First Search (dfs))
  dfs(s)
  {
      // verifie si la liste Map() est vide ou pas
      if(this.P.size == 0)
      {
        this.P.set(s,null);
        this.sommetInit = s;
      }

      this.couleur.set(s,'gris');// mettre la couleur su sommet initial a grise
      this.Q.push(s);// ajout du sommet initial a la liste des sommet a parcourir
      

      // tantque la liste des sommets a parcourir sera vide
      for( let i = 0 ; i<this.Q.length  ;i++)
      { 
        let voisins = [];
        let u = this.Q[ this.Q.length -1]; // recupere le dernier element du tableau
        voisins = this.adjList.get(u); // renvoie tous les voisins de u

        let R = [];
        
        // recuperation de tous les voisins non visité (couleur en blanc)
        voisins.forEach(element => {
          if (this.couleur.get(element) == 'blanc')
          {
            R.push(element);
          }
        });
        

        if(typeof R != "undefined" && R != null && R.length != null && R.length >0)// verifier si la liste est non vide
        {
          // pour chaque voisin ,on effectue le parcours
          R.forEach(element => {

          this.P.set(element , u);
          this.dfs(element);

          });

        }
          else
        {
          this.Q.pop();
          this.couleur.set(u,'noir');
          if(!this.fermer.includes(u))// verifie l'existence de l'element dans la liste
          {
            this.fermer.push(u);
          }
              
        }
      }


      return this.P
  }


}

/// end class


module.exports = function(io) {
  
  var express = require('express');
  var router = express.Router();

   var lesSoms ;
  // variable graph


  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Graphe | Profondeur' });
    
  });


io.on('connection', (io) => {
  dataGraphServer = [null] ;
  lesSoms = [null]
  console.log("Client connected!");
 
    io.on('dataGraph', (data) => {
      dataGraphServer = data.data
      lesSoms = data.nbSom
      console.log(lesSoms)
      // graph

    var g = new Graph();

    for(let i=0; i<lesSoms.length ;i++ )
    {
      g.addVertex(lesSoms[i]);
    }

    for(let i=0; i<dataGraphServer.length ;i++ )
    {
      let lien = dataGraphServer[i];
      let first=lien[0];
      let second = lien[1];
      g.addEdge(first,second);
    }
/*
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A','C');
g.addEdge('B','A');
g.addEdge('B','D');
g.addEdge('D','A');
g.addEdge('D', 'B');
g.addEdge('D', 'C');
g.addEdge('D','E');
g.addEdge('C','A');
g.addEdge('C','D');
g.addEdge('E','D');

*/
g.printGraph();

console.log('Parcours en profondeur');
console.log(g.dfs('A'));
console.log(g.couleur);
console.log(g.fermer);
g.addFirst('A');
console.log(g.fermer);



io.emit('recupererNouveauMessage', {graph:g.fermer});
})




});

  return router;
}

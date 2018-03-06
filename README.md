# Hashcode-2018
## Arrêtez vous tous, c'est nous qu'on va gagner

**INTRO:** we scored 11,825,929 at the end of the given time to submit results to the judge system (best score: 49,776,211); we decided to push it further and create a working simulation of the problem

### Problem Statement for the qualification round
You will find the problem statement of the hashcode 2018 qualification round in the file: qualification_round.pdf

### Algorithms
#### Simulation Algorithm
The branch "simulation-algorithm" contains the first algorithm tried for this project.<br/>
This algorithm simulate a situation where vehicules are searching for a new ride everytime they finish the past one.<br/>
It contains a simulation loop which is updating the position of the vehicules at every step.<br/>
It scored 47,254,994.<br/>
Score detail:
- a_example: 10
- b_should_be_easy: 154,759
- c_no_hurry: 15,791,787
- d_metropolis: 10,142,889
- e_high_bonus: 21,165,549

#### Prediction Algorithm
The branch "prediction-algorithm" contains the prediction algorithm<br/>
In this algorithm, every vehicle tries to find the best rides to take to make the maximum amount of point.<br/>
The problem with this algorithm is that the first vehicle will take the most rides it can take and the vehicles at the end might have no ride to take.<br/>
It is far from being the best.
It scored 37,123,238
Score detail:
- a_example: 10
- b_should_be_easy: 173,377
- c_no_hurry: 9,070,534
- d_metropolis: 6,664,342
- e_high_bonus: 21,214,975

### How to run the simulation
npm install && npm start

// JavaScript Document



var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://AlanUser:AlanIzC00l@cluster0-mcspy.mongodb.net/test?retryWrites=true"

var playerdata;

// Input variables are percentile based, blockWeight represents the importance of that stat in calculating the score
function calculateScore(player, damageWeight, healWeight, blockWeight, killWeight, hero){
	specificData = playerdata[player];
	damage = specificData.damage;
	heals = specificData.heals;
	blocked = specificData.blocked;
	kills = specificData.kills;
	var score = 0;
	score += (damage*damageWeight) + (heals*healWeight) + (blocked*blockWeight) + (kills*killWeight);
	score += getCCScore(hero);
	return score;
}

//Get score for crowd control on a per hero basis
function getCCScore(hero){
	if (hero == 'Rein'){return getReinCCScore}
	else{return 0}
}

function getPercentile (playerNum) {
	
	var percData = {pDamage: 0, pHeals: 0, pBlocked: 0, pKills: 0};

	percData = getDamagePercentile(playerNum, percData);
}

function getDamagePercentile(playerNum, percData){
	var rank = 1;
	for(var i = 0; i < playerdata.length; i++){
		if(i != playerNum && playerdata[i].damage < playerdata[playerNum].damage){
			rank++;
		}
	}
	percData.pDamage = (rank / playerdata.length) * 100;
	return percData;
}

MongoClient.connect(uri, function(err, db) {
	if (err) throw err;
	var dbo = db.db("Players");
	var query = {};
	dbo.collection("Players").find(query).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		playerdata = result;
		db.close()
		console.log(playerdata[1].damage);
		console.log("The score for " + playerdata[0].name + " is " + calculateScore(0, 1, 1, 0, 5, "McCree"));
	});
	
});
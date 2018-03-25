pragma solidity ^0.4.0;
/* import "github.com/oraclize/ethereum-api/oraclizeAPI.sol"; */
import "oraclize0.4.sol";

contract FuelPrice is usingOraclize {

    uint public DieselPriceUSD;
    string public currentTimeUTC;

    string private DIESEL_URL = "xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel";
    string private UTCTIME_URL = "json(http://worldclockapi.com/api/json/utc/now).currentFileTime";

    enum oracleTypes { diesel, time }

    mapping(bytes32=>bool) public validOraclizeIds; //should be private IRL
    mapping(bytes32=>oracleTypes) public oraclizeDescriptions; //should be private IRL

    event newOraclizeQuery(string description);
    event newDieselPrice(string price);

    // function DieselPrice() {
        // update(); // first check at contract creation
    // }

    function __callback(bytes32 myid, string result) {
      //if we dont have any valid oraclize IDs, get out of there
      if (!validOraclizeIds[myid]) throw;

      //if the caller isn't from the actual oracle service, get out of here as well
      if (msg.sender != oraclize_cbAddress()) throw;

      //was diesel called?
      if (oraclizeDescriptions[myid] == oracleTypes.diesel) {
        newDieselPrice(result);
        DieselPriceUSD = parseInt(result, 2); // let's save it as $ cents
      }

      //was time called?
      if (oraclizeDescriptions[myid] == oracleTypes.time) {
        currentTimeUTC = result;
      }

      //cleanup
      delete validOraclizeIds[myid];
      delete oraclizeDescriptions[myid];
    }

    function update() payable {
      newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
      bytes32 dieselId = oraclize_query("URL", DIESEL_URL);
      validOraclizeIds[dieselId] = true;
      oraclizeDescriptions[dieselId] = oracleTypes.diesel;
    }

    function updateTime() payable {
      newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
      bytes32 timeId = oraclize_query("URL", UTCTIME_URL);
      validOraclizeIds[timeId] = true;
      oraclizeDescriptions[timeId] = oracleTypes.time;
    }

}

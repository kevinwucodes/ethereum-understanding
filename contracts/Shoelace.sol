pragma solidity ^0.4.18;

contract Shoelace {

  /***************
   * shoelace formula
   **************/

   // two events depending on argument type
   event debug(
     string message,
     int256 index
   );

   event debug(
     string message,
     uint256 index
   );

   event debug(
     string message
   );

   function shoelace(int256[] coords) public returns(uint256) {

     //final return value MUST be uint because this is a positive area
     //final implementation should be pure without events

     //determine if gas costs are affected if we use either int8 vs int256

     //must be even set of coords and great or equal to 3 coord pairs
     require(coords.length >= 6 && coords.length % 2 == 0);

     //write shoelace theorem logic here
     /* [3,4, 5,11, 12,8, 9,5, 5,6] */

     /* abs(3*11 + 5*8 + 12*5 + 9*6 + 5*4
     - 4*5 - 11*12 - 8*9 - 5*5 - 6*3)

     * 0.5 */

     int256 positiveSide;
     int256 negativeSide;

     uint8 skip3 = 3;
     uint8 skip1 = 1;

     /* debug('coords.length', coords.length); */
     /* debug('************************'); */

     //positive side
     for(uint8 i = 0; i < coords.length; i = i + 2) {
       if (i + skip3 < coords.length) {
         /* debug('i+skip3', i+skip3); */
         /* debug('i', i); */
         debug('calc', coords[i] * coords[ i + skip3 ]);
         positiveSide = positiveSide + (coords[i] * coords[ i + skip3 ]);

         /* debug('positiveSide', positiveSide); */
       } else {
         debug('skipper', coords[i] * coords[1]);
         positiveSide = positiveSide + (coords[i] * coords[1]);
       }
     }

     debug('************************');

     //negative side
     for(i = 1; i < coords.length; i = i + 2) {
       if (i + skip1 < coords.length) {
         debug('calc', coords[i] * coords[ i + skip1 ]);
         negativeSide = negativeSide + (coords[i] * coords[ i + skip1 ]);
       } else {
         debug('skipper', coords[0] * coords[ coords.length - 1 ]);
         negativeSide = negativeSide + (coords[0] * coords[ coords.length - 1 ]);
       }
     }

     debug('************************');

     debug('positiveSide', positiveSide);
     debug('negativeSide', negativeSide);

     debug('division', int(5) / int(2));


     return 4;

   }

}

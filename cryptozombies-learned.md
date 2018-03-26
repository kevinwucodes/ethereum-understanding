# lessons learned from cryptozombies

## inheritance

A contract inheritance can be inherited in all children, not just the source contract where the inheritance is defined

## Gas savings

using uint8 over uint256 wont save gas because solidity reserves 256-bits regardless of uint size
except structs.
struct packing saves gas solidity will pack variables together to take up less storage.
in structs, you want to pack identical data types together, like:

```
uint a;
uint32 b;
uint32 c;
```
instead of:
```
uint32 b;
uint a;
uint32 c;
```

Above page is Dream11(www.dream11.com) contest home page, it has following components

1. Header
    1. Tour Name
    2. Match Start Time
    3. Guru link
2. Footer
    1. Create Tram count
    2. Joined Contests count
3. List of contests
    1. Available Contests
    2. Joined Contests
    3. Free Contests

To implement the page we have multiple ways, 1st approach which comes to our mind is to have a customized api which provides all information required to render the page, so the aggregated data would look like

```
API response

{ "tour": { }, "match":{ }, "contests": [], "joinedContests": [], "freeContests": [], "joinedContestCount": 0, "teamsCreatedCount": 0 }

```
Here client will have to map all contests and Joined contests to show join, join+ or invite button also map all contests and free contests to show Free or join button 

Pros: 
1. API call

Cons: 
1. Not scalable:
    It makes our system *monolith* which affects system scalability, to achieve high scale we might break this api to micro services
    `tour` can come from tour service
    `match` can come from match service
    `contests, joinedContests, freeContests, joinedContestCount` can come from contest service,
    `teamsCreatedCount` can come from team service 
2. Client side computation
    1. decide join, join+ or invite 
    2. decide free or join
    




Other way to achieve is using micro services

Lets assume we have micro services such as `team, tour, match and contest`, in this approach the following api call will be required to build the given screen


1. Tour details
2. Match Details
3. Guru Link
4. Created Team Count
5. Joined Contest Count
6. Available Contests List
7. Free Contests List
8. Joined Contests List

Here also client will have to map all contests and Joined contests to show join, join+ or invite button also map all contests and free contests to show Free or join button


Pros: 
Scalable:
    In this approach we are calling an api to perform each task, this solves one big scale problem faced in approach 1

Cons: 
1. Too Many API calls
    1. Too many api calls from client which requires API specific error handling intelligence
2. Client side computation
    1. decide join, join+ or invite 
    2. decide free or join
Since we are using several calls, this approach is scalable
Option 3

Using GraphQL
Get page Data using Graph Structure

Pros: 
Scalable
GraphQL is giving a schema contract to clients and behind it may call several services which expose either GraphQL or REST
1 GQL call
GQL will behave as an aggregator so client has to make only 1 GQL request to render the page and GQL could fork it to multiple requests
No client side computation
Since GQL provides a strict contract between client and server and it is  Graph of nodes, client does not need to do any computation
Scope of Caching


Abstraction of server Implementation by introduction of schema 
Decoupling of Client  
Cons: 
None


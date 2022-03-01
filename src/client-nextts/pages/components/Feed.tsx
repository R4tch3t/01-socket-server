import type {NextPage} from 'next'
import { useState } from 'react'
import { io, Socket } from "socket.io-client";
/*const people = [
    {
      name: 'Lindsay Walton',
      imageUrl:
        'https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg',
    },
    // More people...
  ]
const activityItems = [
{ id: 1, person: people[0], project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
// More items...
]*/

const Feed: NextPage = () => {
    const people = [{
        name: '',
        imageUrl:'',
      }]
    let [activityItems, setActivityItems]: any = useState([]);
    const socket: Socket = io();
    socket.on("msjfromserver", (data)=>{
        //const listmsj: any = document.getElementById("mensajes");
        //listmsj.innerHTML += `<li>${data.msj}</li>`
        const {msj, time, name} = data;
        //const name = "Victor"
        const imageUrl='https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg';
        const id = activityItems.length+1;
        
        //const time = '1h'
        people.push({name,imageUrl});
        const person = people[people.length-1];
        activityItems=activityItems.concat([{id,person,msj,time}]);
        setActivityItems(activityItems);
    });

    if(activityItems.length>0){
        return (
            <div style={{width: 500}} >
            <ul role="list" className="divide-y divide-gray-200">
                {activityItems.map((activityItem: any) => (
                <li key={activityItem.id} className="py-4">
                    <div className="flex space-x-3">
                    <img className="h-6 w-6 rounded-full" src={activityItem.person.imageUrl} alt="" />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{activityItem.person.name}</h3>
                        <p className="text-sm text-gray-500">{activityItem.time}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                        {/*Deployed {activityItem.project} ({activityItem.commit} in master) to {activityItem.environment}*/}
                        {activityItem.msj}
                        </p>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        )
    }else{
        return <></>
    }
}

export default Feed
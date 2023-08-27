//La App es el contenedor en si, que almacena varios componentes. Es lo que 
//se renderiza luego
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
    const formatUserName = (userName) => `@${userName}`
    //Vamos a pasar la funcion como prop, esto es muy útil
    const alonso = {initialIsFollowing: true, userName: 'la33', formatUserName: formatUserName}
    const users = [
        {
            userName: 'jaimeBombeto',
            name: 'Jaime El Bombas',
            isFollowing: true,
            formatUserName: formatUserName,
        },
        {
            userName: 'Eloncito',
            name: 'Elon Musk',
            isFollowing: true,
            formatUserName: formatUserName,
        },
        {
            userName: 'solomeoParedes',
            name: ' Solo Meo',
            isFollowing: false,
            formatUserName: formatUserName,
        }
        

    ]
        
    

    return (
        <section className='App'>
          {
             users.map(user => {
                const { userName, name, isFollowing, formatUserName } = user;
                return (
                    <TwitterFollowCard
                        userName={userName}
                        initialIsFollowing={isFollowing}
                        formatUserName={formatUserName}
                        key={userName}
                    >
                        {name}
                    </TwitterFollowCard>
                )
            })
          }
           

            <TwitterFollowCard  {... alonso}>
                Fernando Alonso
            </TwitterFollowCard>
        </section>
    )
}
import { spotifyAtom } from "@/spotify"
import { Switch } from "@nextui-org/react"
import { useAtom } from "jotai"
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md"


export const MusicSwitch = () => {
    const [spotify, setSpotify] = useAtom(spotifyAtom)

    return <Switch
        defaultSelected
        size="md"
        color="success"
        isSelected={spotify.isPlaying}
        onValueChange={async (val) => {
            console.log('settings player ', val, spotify)
            if (val) {
                await spotify.player.resume()
                setSpotify((state) => ({ ...state, isPlaying: true }))
            } else {

                await spotify.player.pause()
                setSpotify((state) => ({ ...state, isPlaying: false }))

            }
        }}
        startContent={<MdOutlineMusicNote />}
        endContent={<MdOutlineMusicOff />}
    >
        
    </Switch>


}
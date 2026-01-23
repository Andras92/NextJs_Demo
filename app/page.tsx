import EventCards from "@/components/EventCards"
import ExploreButton from "@/components/ExploreButton"
import events from "@/lib/actions/constants"

const Page = () => {
    return (
        <section>
            <h1 className="text-center">The Hub for every Dev <br /> Event You Can't Miss</h1>
            <p className="text-center m-5">Hackatons, Meetups, and Conference, All in One Place!</p>
            <ExploreButton />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                <ul className="events">
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCards {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Page
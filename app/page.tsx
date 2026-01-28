import EventCards from "@/components/EventCards"
import ExploreButton from "@/components/ExploreButton"
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
    'use cache'
    cacheLife("hours")
    const response = await fetch(`${BASE_URL}/api/events`);
    const { events } = await response.json();

    return (
        <section>
            <h1 className="text-center">The Hub for every Dev <br /> Event You Can't Miss</h1>
            <p className="text-center m-5">Hackatons, Meetups, and Conference, All in One Place!</p>
            <ExploreButton />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                <ul className="events">
                    {events && events.length > 0 && events.map((event: IEvent) => (
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
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from '../../components/events/results-title';
import Button from "../../components/ui/button";
import ErrorAlert from '../../components/ui/error-alert'
function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;
    console.log(filterData);
    if(!filterData){
        return <p className="center" style={{marginTop:'15px'}}>Lloading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    
    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2025 || numYear < 2021 || numMonth > 12 || numMonth < 1){
        return (
            <>
                <ErrorAlert><p className="center" >invalid filter, please adjust your values!</p></ErrorAlert>
                <div className="center"  >
                    <Button link="/events" > Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if(!filteredEvents || filteredEvents.length === 0){
        return (
            <>
                <ErrorAlert><p className="center">No events found for the chosen filter!</p></ErrorAlert>
                <div className="center"  >
                <Button link="/events" > Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(numYear, numMonth - 1);
    return(
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </>
    )
}


export default FilteredEventsPage;
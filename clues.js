// Clues organized by file color
export const cluesByColor = {
    red: [
        {
            id: 1,
            clue: "From your team's independent research, the Riverside E-Sports Arena should improve community engagement by creating partnerships with local establishments.",
            question: "What area of improvement did the red file research reveal?",
            response: "Improve community engagement by creating partnership with local establishments"
        },
        {
            id: 2,
            clue: "Next to the Arena, there are 5 food and beverage venues: Thai Tanic, Bistro Tabac, the Irish Pub, Cafe Luna, and Star Bar.",
            question: "What food and drink venues are close to the Riverside E-Sports Arena?",
            response: "There are 5 venues: Thai Tanic, Bistro Tabac, the Irish Pub, Cafe Luna, and Star Bar"
        },
        {
            id: 3,
            clue: "When considering ticket sales, the events with the highest sold out rate were the Arena 1's international, sponsored competitions at 75%. While the events with the lowest sold out rate were the in-house competitions held in Arena 2, at 60%.",
            question: "Last year, which type of event had the highest ticket sales rate, which type had the lowest?",
            response: "Highest sold out rate: The Arena 1's international, sponsored competitions at 75%. Lowest sold out rate: in-house competitions held in Arena 2, at 60%"
        },
        {
            id: 4,
            clue: "The file also reveals that 90% of the events were held at Arena 1, and 10% of the events at Arena 2.",
            question: "Last year, what proportion of the event used the bigger Arena 1 (vs. small Arena 2)?",
            response: "90% Arena 1, 10% Arena 2"
        },
        {
            id: 5,
            clue: "The Arena attempted to host a multi-day indie game convention for the first time last year, but it was considered a failure. Attendance was low after the first day.",
            question: "Last year, what's a new event production that the Arena tried last year but did not pan out?",
            response: "Multi-day indie game convention. Attendance was low after the first day."
        },
        {
            id: 6,
            clue: "Events held in the winter fared best. With many winter events selling out all available tickets.",
            question: "Last year, events held in which time of the year had the most success?",
            response: "Events held in the winter fared best. With most events selling out all available tickets."
        }
    ],
    blue: [
        {
            id: 7,
            clue: "From your team's independent research, the Riverside E-Sports Arena should increase financial sustainability by finding new revenue sources and cost cutting.",
            question: "What area of improvement did the blue file reveal?",
            response: "Increase financial sustainability by finding new revenue sources and cost cutting"
        },
        {
            id: 8,
            clue: "Next to the Arena, there is a large convention center: Riverview Hotel & Convention Center.",
            question: "What business/corporate establishments are present in the general area?",
            response: "A large convention center: Riverview Hotel & Convention Center."
        },
        {
            id: 9,
            clue: "When considering the type of events, the events with the highest profit margin were in-house competitions held in Arena 2, at 25%. While the events with the lowest profit margins were international competitions held in Arena 1, at 9%.",
            question: "Last year, which type of event had the highest profit margin? Which type had the lowest?",
            response: "Highest profit margin: in-house competitions in Arena 2, at 25%. Lowest: international competitions in Arena 1, at 9%"
        },
        {
            id: 10,
            clue: "When considering the target demographic group, last year, all events exclusively targeted the adult audience.",
            question: "Last year, what demographics were the events of Arena 1 targeting (youth vs. adults)?",
            response: "The shows were targeting adult audience exclusively"
        },
        {
            id: 11,
            clue: "The Arena previously discussed plans for a third, medium sized (capacity for 5000) Arena / Stage for hosting two tournaments at once, and for sports viewing parties when vacant. But the plan has stalled.",
            question: "Last year, what's an expansion plan the Arena discussed, but so far has stalled?",
            response: "A third, medium sized (capacity for 5000) Arena / Stage for hosting two tournaments at once, and for sports viewing parties when vacant."
        },
        {
            id: 12,
            clue: "When considering ticket class, general admission tickets sold the best, with early access tickets following, and VIP tickets selling the least.",
            question: "Last year, which ticket class (e.g., General admission, VIP, early access) had the most success?",
            response: "General admission tickets sold the best, with early access tickets following, and VIP tickets selling the least."
        }
    ],
    green: [
        {
            id: 13,
            clue: "From your team's independent research, the Riverside E-Sports Arena should broaden target demographics and produce events that keep up with contemporary culture.",
            question: "What area of improvement did the green file reveal?",
            response: "Broaden target demographics and produce events that keep up with contemporary culture"
        },
        {
            id: 14,
            clue: "Next to the Arena, there is a large community college and two local high schools. Each of them being community institutions that could benefit from a community outreach program.",
            question: "What community institutions are in the neighborhood and what potential groups can benefit from community outreach program?",
            response: "A large community college and two local high schools"
        },
        {
            id: 15,
            clue: "Last year, there was a 5% discount rate offered to groups of special interests (senior, student, disabled).",
            question: "Last year, what was the current discount rate offered to groups of special interests (senior, student, disabled)?",
            response: "5% discount."
        },
        {
            id: 16,
            clue: "When considering utilization rates, the smaller Arena 2 is being underutilized and can potentially be used to create additional events.",
            question: "Last year, what physical space was being underutilized and can potentially be used to create events?",
            response: "The smaller Arena 2."
        },
        {
            id: 17,
            clue: "Last year, the Riverside E-Sports Arena tried a dynamic pricing strategy based on demand, with prices being decreased when ticket sales are low. However, the strategy was considered a failure.",
            question: "Last year, what's a ticket pricing strategy the Arena has tried, but did not pan out?",
            response: "Dynamic pricing based on demand, with prices being decreased when ticket sales are low."
        },
        {
            id: 18,
            clue: "Looking back to the events that were most successful, events held in the late afternoons fared best, regardless of weekday or weekend.",
            question: "Last year, did the time of the event matter for its success?",
            response: "Events held in the late afternoons, fared best, regardless of weekday or weekend."
        }
    ]
};

// Flat array for backward compatibility
export const clues = [
    ...cluesByColor.red,
    ...cluesByColor.blue,
    ...cluesByColor.green
];

export const sharedClues = [
    {
        id: 1,
        clue: "The Riverside E-Sports Arena hosts both in-house competitions (e.g., local tournaments) and external competitions (e.g., international tournaments sponsored by gaming companies) on two stages. The main arena, Arena 1, hosts shows requiring larger arenas (seating 10000). A smaller arena, Arena 2, (seating 700) hosts smaller competitions on the second floor. There are bars that serve beverages, and a recently installed elevator for seniors or disabled audience members."
    },
    {
        id: 2,
        clue: "External competitions are typically tournaments that the Riverside E-Sports Arena hosts by providing incentives for gaming companies (sponsors) to hold tournaments at the venue. In-house competitions are developed by the Riverside E-Sports Arena's production staff and cost less than external competitions, though the revenue is also reduced."
    },
    {
        id: 3,
        clue: "Last year, 53% of group tickets were purchased by corporate groups, 14% by social clubs, 13% hospital staff, 8% by e-sports clubs, and 5% by charity groups."
    },
    {
        id: 4,
        clue: "Marketing research suggests several demographic groups have registered strong interests. These groups are 1) local community colleges and universities, 2) local summer camps hosting middle school and elementary school students, and 3) seasonal tourists looking for rainy day activities."
    }
];

export const taskDescription = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
`;
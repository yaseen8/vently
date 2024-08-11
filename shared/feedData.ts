import { FeedDataDto } from "./dtos/feed-data.dto";

export const feedData: FeedDataDto[] = [
    {
      id: 1,
      username: "Lily Robertson",
      createdAt: new Date().toISOString(),
      location: "Nick's Rooftop Sunset",
      content:
        "House music, great views, better people. Met SO many new friends. Big shout out to Nick for hosting!",
      avatar:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80", // Replace with actual image paths
      likes: 400,
      comments: 4,
    },
    {
      id: 2,
      username: "Angela Wong",
      createdAt: "2024-08-07T09:23",
      location: "Sf Club Meetups",
      content: "Amazing meetup, made new friends to roll into the club with!!!",
      avatar:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80",
      images: [
        "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/HfReHl5.jpg",
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back01.jpg",
      ],
      likes: 450,
      comments: 2,
    },
    {
      id: 3,
      username: "Tony Andros",
      createdAt: "2024-08-09T09:23",
      location: "Harlan's Bar",
      content: "Amazing meetup, made new friends to roll into the club with!!!",
      avatar:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80",
      images: [
        "https://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png",
        "https://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_blue.s2014.png",
      ],
      likes: 500,
      comments: 2,
    },
  ];
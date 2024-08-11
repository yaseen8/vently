import moment from "moment";

export const formatTime = (createdAt: string) => {
    const now = moment();
    const then = moment(createdAt);
    const duration = moment.duration(now.diff(then));

    if (duration.asDays() >= 1) {
      return `${Math.floor(duration.asDays())}d ago`;
    } else if (duration.asHours() >= 1) {
      return `${Math.floor(duration.asHours())}h ago`;
    } else if (duration.asMinutes() >= 1) {
      return `${Math.floor(duration.asMinutes())}m ago`;
    } else {
      return "just now";
    }
  };
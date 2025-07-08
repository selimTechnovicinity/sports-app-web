"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import assets from "@/assets";
import EventCreationModal from "@/components/dashboard/modal/EventCreationModal";
import TeamCreationModal from "@/components/dashboard/modal/TeamCreationModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getEnventQueryFn,
  getTeamQueryFn,
  getUserProfileQueryFn,
} from "@/lib/api";
import { useToast } from "@/lib/Providers/ToastContext";
import { cn } from "@/lib/utils";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";

interface Team {
  _id: string;
  team_name: string;
  image: string;
}

interface Event {
  _id: string;
  team_id?: {
    _id: string;
    team_name: string;
    image: string;
  };
  opponent_team_id?: {
    _id: string;
    team_name: string;
    image: string;
  };
  start_date: string;
  duration: number;
  event_type: string;
  location: string;
}

const DashboardPage = () => {
  const [greenDot, setGreenDot] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [currentUpcomingPage, setCurrentUpcomingPage] = useState(1);
  const [upcomingItemsPerPage] = useState(5);

  const router = useRouter();
  const { showToast } = useToast();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await getUserProfileQueryFn();
      return response.data;
    },
  });
  console.log(userData?.data?.user);

  const { data: eventsData } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await getEnventQueryFn();
      return response.data;
    },
  });

  const { data: teamsData } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await getTeamQueryFn();
      return response.data;
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Categorize events into live and upcoming
  const { liveEvents, upcomingEvents } = eventsData?.data?.reduce(
    (acc: any, event: any) => {
      const startTime = new Date(event.start_date);
      const endTime = new Date(startTime.getTime() + event.duration * 60000);

      if (currentTime >= startTime && currentTime <= endTime) {
        acc.liveEvents.push(event);
      } else if (currentTime < startTime) {
        acc.upcomingEvents.push(event);
      }
      return acc;
    },
    { liveEvents: [], upcomingEvents: [] }
  ) || { liveEvents: [], upcomingEvents: [] };

  // Pagination logic for upcoming events
  const indexOfLastUpcoming = currentUpcomingPage * upcomingItemsPerPage;
  const indexOfFirstUpcoming = indexOfLastUpcoming - upcomingItemsPerPage;
  const currentUpcomingEvents = upcomingEvents.slice(
    indexOfFirstUpcoming,
    indexOfLastUpcoming
  );
  const totalUpcomingPages = Math.ceil(
    upcomingEvents.length / upcomingItemsPerPage
  );

  const handleUpcomingPageChange = (pageNumber: number) => {
    setCurrentUpcomingPage(pageNumber);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    showToast("Logout successful", "success", "Success");
    router.push("/login");
  };

  const MatchEventCard = ({ event }: { event: Event }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <img
          src={event.team_id?.image || "/default-team.png"}
          alt={event.team_id?.team_name || "Your Team"}
          className="w-10 h-10 rounded-full"
        />
        <p className="text-sm font-medium">
          {event.team_id?.team_name || "Your Team"}
        </p>
      </div>

      <div className="text-center my-2 sm:my-0">
        <p className="text-xs text-gray-500">
          {new Date(event.start_date).toLocaleDateString([], {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(event.start_date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="mt-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
          {event.location || "TBD"}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end sm:justify-start">
        <p className="text-sm font-medium">
          {event.opponent_team_id?.team_name || "Opponent"}
        </p>
        <img
          src={event.opponent_team_id?.image || "/default-team.png"}
          alt={event.opponent_team_id?.team_name || "Opponent"}
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col-reverse lg:flex-row overflow-y-auto">
      {/* Sidebar */}
      <aside className="w-full lg:w-90 bg-white flex flex-col px-4">
        <div className="p-6 flex items-center gap-2 justify-center lg:justify-start">
          <Image
            src={assets.images.logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-lg font-bold text-center lg:text-left">
            ALLSTARS BASKETBALL
          </div>
        </div>
        <div className="bg-[#00D17F] text-white px-6 py-4 font-medium rounded-t-4xl text-center lg:text-left">
          POPULAR TEAM
        </div>
        <ScrollArea className="flex-1 p-4 bg-gray-200 mb-4 rounded-b-4xl">
          <ul className="space-y-3 mb-4">
            {teamsData?.data?.map((team: Team, i: number) => (
              <li
                key={i}
                className="text-sm hover:text-green-500 cursor-pointer flex items-center gap-2"
              >
                <img
                  src={team.image}
                  alt={""}
                  className="w-6 h-6 rounded-full object-cover"
                />
                {team.team_name}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-200 p-4 sm:p-6">
        <div className="lg:hidden flex bg-white mb-4 rounded-lg p-2 justify-between items-center">
          <Image
            src={assets.images.logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-lg font-bold text-center mr-2">
            ALLSTARS BASKETBALL
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <Button
              onClick={() => setModalOpen(true)}
              variant="outlined"
              startIcon={<IoIosAddCircleOutline size={25} />}
              sx={{
                border: "none",
                borderRadius: "20px",
                textTransform: "none",
                padding: 3,
                backgroundColor: "white",
                color: "#00D17F",
                "&:hover": { color: "white", backgroundColor: "#00D17F" },
                marginRight: 2,
                marginTop: 2,
              }}
            >
              Create Team
            </Button>
            <Button
              onClick={() => setEventModalOpen(true)}
              variant="outlined"
              startIcon={<IoIosAddCircleOutline size={25} />}
              sx={{
                border: "none",
                borderRadius: "20px",
                textTransform: "none",
                padding: 3,
                backgroundColor: "#00D17F",
                color: "white",
                "&:hover": { color: "#00D17F", backgroundColor: "white" },
                marginTop: 2,
              }}
            >
              Create Event
            </Button>
          </div>

          <div className="flex items-center sm:items-end gap-4">
            <Box position="relative" display="inline-flex">
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#bdbdbd",
                  "&:hover": {
                    backgroundColor: "#a4a4a4",
                  },
                }}
              >
                <NotificationsIcon />
              </IconButton>

              {greenDot && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "green",
                    zIndex: 1,
                  }}
                />
              )}
            </Box>

            {!isLoading && userData?.data ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar
                    alt={`${userData.data.first_name} ${userData?.data?.user?.last_name}`}
                    src={userData?.data?.user?.image || "/default-avatar.jpg"}
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <div className="flex flex-col p-2">
                      <span className="font-semibold">{`${userData?.data?.user?.first_name} ${userData?.data?.user?.last_name}`}</span>
                      <span className="text-sm text-gray-500">
                        {userData?.data?.user?.email}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {userData?.data?.user?.role.toLowerCase()}
                      </span>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                    <RiLogoutCircleRLine size={20} />
                    <div className="ml-2">Logout</div>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar
                    alt={``}
                    src={"/default-avatar.jpg"}
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                    <RiLogoutCircleRLine size={20} />
                    <div className="ml-2">Logout</div>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </div>

        <TeamCreationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <EventCreationModal
          open={eventModalOpen}
          onClose={() => setEventModalOpen(false)}
        />

        {/* Live Matches */}
        {liveEvents.length > 0 && (
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-0">
              <h2 className="text-lg font-semibold">Live Match</h2>
              <button className="text-green-500 text-sm text-end">
                See All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {liveEvents.map((event: any, i: number) => (
                <div
                  key={event._id}
                  className={cn(
                    "rounded-xl p-4 text-white",
                    i % 2 === 0 ? "bg-[#1c1c29]" : "bg-[#00D084]"
                  )}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-xs">{event.event_type}</p>
                      <p className="text-[11px] text-white/70">
                        {event.location}
                      </p>
                    </div>
                    <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-center">
                      <img
                        src={event.team_id?.image || "/default-team.png"}
                        alt={" "}
                        className="w-10 h-10 rounded-full mx-auto mb-2"
                      />
                      <p className="text-xs mt-2">
                        {event.team_id?.team_name || "Your Team"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs mb-1">
                        {new Date(event.start_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xl font-bold">VS</p>
                    </div>
                    <div className="text-center">
                      <img
                        src={
                          event.opponent_team_id?.image || "/default-team.png"
                        }
                        alt={event.opponent_team_id?.team_name || "Your Team"}
                        className="w-10 h-10 rounded-full mx-auto mb-2"
                      />
                      <p className="text-xs mt-2">
                        {event.opponent_team_id?.team_name || "Opponent"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Matches */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-0">
              <h2 className="text-lg font-semibold">
                {showAllUpcoming ? "All Upcoming Matches" : "Upcoming Match"}
              </h2>
              <button
                className="text-green-500 text-sm text-end"
                onClick={() => {
                  setShowAllUpcoming(!showAllUpcoming);
                  setCurrentUpcomingPage(1);
                }}
              >
                {showAllUpcoming ? "Show Less" : "See All"}
              </button>
            </div>

            {!showAllUpcoming ? (
              <div className="space-y-4">
                {upcomingEvents.slice(0, 3).map((event: Event) => (
                  <MatchEventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div>
                <div className="space-y-4 mb-6">
                  {currentUpcomingEvents.map((event: Event) => (
                    <MatchEventCard key={event._id} event={event} />
                  ))}
                </div>

                {totalUpcomingPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <nav
                      className="flex items-center gap-2"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          handleUpcomingPageChange(currentUpcomingPage - 1)
                        }
                        disabled={currentUpcomingPage === 1}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalUpcomingPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalUpcomingPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentUpcomingPage <= 3) {
                            pageNum = i + 1;
                          } else if (
                            currentUpcomingPage >=
                            totalUpcomingPages - 2
                          ) {
                            pageNum = totalUpcomingPages - 4 + i;
                          } else {
                            pageNum = currentUpcomingPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handleUpcomingPageChange(pageNum)}
                              className={`px-4 py-2 rounded-md border ${
                                currentUpcomingPage === pageNum
                                  ? "bg-green-500 text-white border-green-500"
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() =>
                          handleUpcomingPageChange(currentUpcomingPage + 1)
                        }
                        disabled={currentUpcomingPage === totalUpcomingPages}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;

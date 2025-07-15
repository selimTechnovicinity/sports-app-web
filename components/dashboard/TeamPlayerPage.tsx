"use client";
import CustomButton from "@/components/button/CustomButton";
import API from "@/lib/axios-client";
import { useToast } from "@/lib/Providers/ToastContext";
import { useEffect, useState } from "react";
import PlayerAdditionModal from "./modal/PlayerAdditionModal";

interface Player {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  jersey_no: string;
}

const TeamPlayersPage = ({ teamId }: { teamId: string }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/teams/${teamId}/player`);
      setPlayers(response.data.data);
    } catch {
      showToast("Failed to fetch players", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerAdded = () => {
    fetchPlayers();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Players</h1>
        <CustomButton
          onClick={() => setIsModalOpen(true)}
          sx={{ boxShadow: "none" }}
        >
          Add Player
        </CustomButton>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading players...</p>
        </div>
      ) : players.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No players found for this team</p>
          <CustomButton
            onClick={() => setIsModalOpen(true)}
            sx={{ boxShadow: "none" }}
          >
            Add First Player
          </CustomButton>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jersey #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.jersey_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.first_name} {player.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PlayerAdditionModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          handlePlayerAdded();
        }}
      />
    </div>
  );
};

export default TeamPlayersPage;

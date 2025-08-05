// import { useState, useEffect } from 'react';
// import { LeaderboardEntry, LeaderboardType } from '../types/leaderboard';
// import { mockLeaderboardAPI } from '../mock/leaderboardData';

// export const useLeaderboard = (sortBy: LeaderboardType) => {
//   const [data, setData] = useState<LeaderboardEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         // In production, this would be: const response = await fetch(`/api/leaderboard?type=${type}`);
//         const result = await mockLeaderboardAPI(type);
//         setData(result);
//       } catch (err) {
//         setError('Failed to fetch leaderboard data');
//         console.error('Leaderboard fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, [type]);

//   return { data, loading, error };
// };


// import { useState, useEffect } from 'react';
// import { LeaderboardEntry, LeaderboardType } from '../types/leaderboard';

// export const useLeaderboard = (type: LeaderboardType) => {
//   const [data, setData]     = useState<LeaderboardEntry[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError]     = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);
//     setError(null);

//     const fetchLeaderboard = async () => {
//       try {
//         // adjust path if your real endpoint is different
//         const res = await fetch(`https://api.kids.lipi.game/v1/leaderboard/web/get?sortBy=${type}&limit=10&offset=0`);
//         if (!res.ok) {
//           throw new Error(`HTTP ${res.status}`);
//         }

//         const json = await res.json() as {
//           success: boolean;
//           message?: string;
//           data?: LeaderboardEntry[];
//         };

//         if (!json.success) {
//           throw new Error(json.message || 'Failed to load leaderboard');
//         }


//         console.log('Leaderboard data fetched:', json.data);

//         if (isMounted && json.data) {
//           setData(json.data);
//         }
//       } catch (err) {
//         console.error('Leaderboard fetch error:', err);
//         if (isMounted) {
//           setError('Failed to fetch leaderboard data');
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchLeaderboard();

//     return () => {
//       isMounted = false;
//     };
//   }, [type]);

//   return { data, loading, error };
// };


import { useState, useEffect } from 'react';
import { LeaderboardEntry, LeaderboardType, LeaderboardScope } from '../types/leaderboard';
import { mockLeaderboardAPI } from '../mock/leaderboardData';

export const useLeaderboard = (type: LeaderboardType, scope: LeaderboardScope = 'school') => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // const res = await fetch(`https://api.kids.lipi.game/v1/leaderboard/web/get?sortBy=${type}&limit=10&offset=0`);

        const result = await mockLeaderboardAPI(type, scope);
        setData(result);
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        console.error('Leaderboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [type, scope]);

  return { data, loading, error };
};
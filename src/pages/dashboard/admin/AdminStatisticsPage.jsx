import { useAxiosSecure } from '@/hooks/axios/useAxios';
import { useQuery } from '@tanstack/react-query';
import Chart from 'react-apexcharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';

const AdminStatisticsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { data: barCharData, isLoading } = useQuery({
    queryKey: ['adminStatistics'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/bookedParcel/admin/date-wise');
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={30} />
      </div>
    );

  // Format data for ApexCharts
  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    xaxis: {
      categories: barCharData.map((data) => data.date), // Dates
      title: { text: 'Dates' },
    },
    yaxis: {
      title: { text: 'Number of Bookings' },
    },
    dataLabels: { enabled: false },
    colors: ['#6366F1'], // Bar color
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    title: {
      text: 'Bookings by Date',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Bookings',
      data: barCharData.map((data) => data.bookedParcel), // Bookings
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Bookings by Date</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chart */}
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatisticsPage;

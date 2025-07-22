import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  size: number;
  open_issues_count: number;
}

interface RepositoryAnalyticsProps {
  repositories: Repository[];
}

export const RepositoryAnalytics = ({ repositories }: RepositoryAnalyticsProps) => {
  // Language distribution
  const languageDistribution = repositories.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topLanguages = Object.entries(languageDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6);

  // Stars vs Forks correlation
  const topRepos = repositories
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'hsl(212 100% 48%)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888'
        }
      }
    }
  };

  const languageChartData = {
    labels: topLanguages.map(([lang]) => lang),
    datasets: [
      {
        data: topLanguages.map(([, count]) => count),
        backgroundColor: [
          'hsl(212 100% 48%)',
          'hsl(110 100% 28%)',
          'hsl(28 100% 52%)',
          'hsl(262 84% 58%)',
          'hsl(0 84% 60%)',
          'hsl(200 100% 48%)'
        ],
        borderWidth: 0
      }
    ]
  };

  const starsChartData = {
    labels: topRepos.map(repo => repo.name.length > 15 ? repo.name.substring(0, 15) + '...' : repo.name),
    datasets: [
      {
        label: 'Stars',
        data: topRepos.map(repo => repo.stargazers_count),
        backgroundColor: 'hsl(212 100% 48% / 0.8)',
        borderColor: 'hsl(212 100% 48%)',
        borderWidth: 2
      },
      {
        label: 'Forks',
        data: topRepos.map(repo => repo.forks_count),
        backgroundColor: 'hsl(110 100% 28% / 0.8)',
        borderColor: 'hsl(110 100% 28%)',
        borderWidth: 2
      }
    ]
  };

  const totalStats = {
    totalRepos: repositories.length,
    totalStars: repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    totalForks: repositories.reduce((sum, repo) => sum + repo.forks_count, 0),
    avgStars: Math.round(repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0) / repositories.length)
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{totalStats.totalRepos}</div>
          <div className="text-sm text-muted-foreground">Repositories</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-github-orange">{totalStats.totalStars.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Stars</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-github-green">{totalStats.totalForks.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Forks</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-github-purple">{totalStats.avgStars.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Avg Stars</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Doughnut 
                data={languageChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      ...chartOptions.plugins.legend,
                      position: 'right' as const
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Top Repositories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Repositories</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Bar data={starsChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
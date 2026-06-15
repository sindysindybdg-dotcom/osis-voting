"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, CheckCircle, Circle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Voter {
  id: string;
  class_name: string;
  voter_count: number;
  voted_count: number;
  created_at: string;
}

export default function DataPemilihPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [voters, setVoters] = useState<Voter[]>([
    {
      id: "uuid-1",
      class_name: "X.PPLG-1",
      voter_count: 36,
      voted_count: 28,
      created_at: "2026-06-01",
    },
    {
      id: "uuid-2",
      class_name: "X.PPLG-2",
      voter_count: 35,
      voted_count: 31,
      created_at: "2026-06-01",
    },
    {
      id: "uuid-3",
      class_name: "X.RPL-1",
      voter_count: 34,
      voted_count: 34,
      created_at: "2026-06-01",
    },
    {
      id: "uuid-4",
      class_name: "X.RPL-2",
      voter_count: 33,
      voted_count: 25,
      created_at: "2026-06-01",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Voter>>({});

  const filteredVoters = voters.filter((v) =>
    v.class_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenDialog = (voter?: Voter) => {
    if (voter) {
      setEditingId(voter.id);
      setFormData(voter);
    } else {
      setEditingId(null);
      setFormData({
        class_name: "",
        voter_count: 0,
        voted_count: 0,
      });
    }
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setVoters(
        voters.map((v) => (v.id === editingId ? ({ ...v, ...formData } as Voter) : v)),
      );
    } else {
      setVoters([
        ...voters,
        {
          ...(formData as Voter),
          id: `uuid-${Date.now()}`,
          created_at: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setVoters(voters.filter((v) => v.id !== id));
  };

  const totalVoters = voters.reduce((sum, v) => sum + v.voter_count, 0);
  const totalVoted = voters.reduce((sum, v) => sum + v.voted_count, 0);
  const turnoutPercentage =
    totalVoters > 0 ? Math.round((totalVoted / totalVoters) * 100) : 0;

  return (
    <main className="pt-20 md:pt-8 px-4 md:px-8 pb-24 md:pb-8 w-full grow">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Daftar Pemilih
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau dan kelola data pemilih per kelas.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => handleOpenDialog()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-md shadow-blue-500/20"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Kelas</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Daftar Pemilih" : "Tambah Daftar Pemilih"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label className="text-sm font-medium">Nama Kelas</label>
                <input
                  value={formData.class_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, class_name: e.target.value })
                  }
                  placeholder="Contoh: X.PPLG-1"
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Total Jumlah Pemilih
                </label>
                <input
                  type="number"
                  value={formData.voter_count || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voter_count: parseInt(e.target.value),
                    })
                  }
                  placeholder="0"
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Jumlah Yang Sudah Memilih
                </label>
                <input
                  type="number"
                  value={formData.voted_count || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voted_count: parseInt(e.target.value),
                    })
                  }
                  placeholder="0"
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Simpan Perubahan" : "Simpan"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            Total Pemilih
          </h3>
          <p className="text-3xl font-bold text-slate-900">{totalVoters}</p>
        </div>
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            Sudah Memilih
          </h3>
          <p className="text-3xl font-bold text-emerald-600">{totalVoted}</p>
        </div>
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            Tingkat Partisipasi
          </h3>
          <p className="text-3xl font-bold text-blue-600">{turnoutPercentage}%</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              placeholder="Cari nama kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Kelas</th>
                <th className="px-6 py-4">Total Pemilih</th>
                <th className="px-6 py-4">Sudah Memilih</th>
                <th className="px-6 py-4">Belum Memilih</th>
                <th className="px-6 py-4">Persentase</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVoters.length > 0 ? (
                filteredVoters.map((voter) => {
                  const percentage =
                    voter.voter_count > 0
                      ? Math.round((voter.voted_count / voter.voter_count) * 100)
                      : 0;
                  const notVoted = voter.voter_count - voter.voted_count;

                  return (
                    <tr
                      key={voter.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {voter.class_name}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {voter.voter_count}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        {voter.voted_count}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2 text-amber-600">
                        <Circle className="w-4 h-4" />
                        {notVoted}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {percentage}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleOpenDialog(voter)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(voter.id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada kelas yang sesuai dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

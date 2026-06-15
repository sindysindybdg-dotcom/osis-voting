"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Candidate {
  id: string;
  order_number: number;
  chairman_name: string;
  vice_chairman_name: string;
  vision: string;
  missions: string[];
  photo_urls: {
    chairman: string;
    vice_chairman: string;
  };
  created_at: string;
}

export default function DataKandidatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "uuid-1",
      order_number: 1,
      chairman_name: "Budi Santoso",
      vice_chairman_name: "Siti Aminah",
      vision: "Mewujudkan OSIS yang inovatif dan kreatif.",
      missions: ["Program 1", "Program 2"],
      photo_urls: { chairman: "", vice_chairman: "" },
      created_at: "2026-06-01",
    },
    {
      id: "uuid-2",
      order_number: 2,
      chairman_name: "Agus Wijaya",
      vice_chairman_name: "Dian Kusuma",
      vision: "Menjadikan OSIS sebagai mitra strategis sekolah.",
      missions: ["Program 3", "Program 4"],
      photo_urls: { chairman: "", vice_chairman: "" },
      created_at: "2026-06-01",
    },
    {
      id: "uuid-3",
      order_number: 3,
      chairman_name: "Rendi Pratama",
      vice_chairman_name: "Siti Nurhaliza",
      vision: "OSIS yang kreatif, tangkas, dan berprestasi.",
      missions: ["Program 5", "Program 6"],
      photo_urls: { chairman: "", vice_chairman: "" },
      created_at: "2026-06-01",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Candidate>>({});

  const filteredCandidates = candidates.filter(
    (c) =>
      c.chairman_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vice_chairman_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenDialog = (candidate?: Candidate) => {
    if (candidate) {
      setEditingId(candidate.id);
      setFormData(candidate);
    } else {
      setEditingId(null);
      setFormData({
        order_number: 0,
        chairman_name: "",
        vice_chairman_name: "",
        vision: "",
        missions: [],
        photo_urls: { chairman: "", vice_chairman: "" },
      });
    }
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setCandidates(
        candidates.map((c) => (c.id === editingId ? ({ ...c, ...formData } as Candidate) : c)),
      );
    } else {
      setCandidates([
        ...candidates,
        {
          ...(formData as Candidate),
          id: `uuid-${Date.now()}`,
          created_at: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setCandidates(candidates.filter((c) => c.id !== id));
  };

  return (
    <main className="pt-20 md:pt-8 px-4 md:px-8 pb-24 md:pb-8 w-full grow">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manajemen Kandidat
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data paslon calon ketua & wakil ketua OSIS.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => handleOpenDialog()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-md shadow-blue-500/20"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Kandidat</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Kandidat" : "Tambah Kandidat Baru"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div>
                <label className="text-sm font-medium">Nomor Urut</label>
                <input
                  type="number"
                  value={formData.order_number || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_number: parseInt(e.target.value),
                    })
                  }
                  placeholder="1"
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Nama Ketua</label>
                <input
                  value={formData.chairman_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, chairman_name: e.target.value })
                  }
                  placeholder="Nama Ketua"
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Nama Wakil Ketua</label>
                <input
                  value={formData.vice_chairman_name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vice_chairman_name: e.target.value,
                    })
                  }
                  placeholder="Nama Wakil Ketua"
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Visi</label>
                <textarea
                  value={formData.vision || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, vision: e.target.value })
                  }
                  placeholder="Visi paslon"
                  className="w-full p-2 border rounded-lg mt-1"
                  rows={3}
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

      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              placeholder="Cari nama kandidat..."
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
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama Ketua</th>
                <th className="px-6 py-4">Wakil Ketua</th>
                <th className="px-6 py-4">Visi</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {candidate.order_number}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {candidate.chairman_name}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {candidate.vice_chairman_name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                      {candidate.vision}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleOpenDialog(candidate)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(candidate.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada kandidat yang sesuai dengan pencarian.
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

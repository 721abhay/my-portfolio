"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, Save, Plus, Trash2, ChevronUp, ChevronDown, 
  Settings, Award, FolderCheck, Star, Sparkles, Link as LinkIcon 
} from "lucide-react"
import { usePortfolio, PortfolioData, ProjectData, ServiceData, SkillGroupData } from "@/lib/portfolio-provider"

type Tab = "hero" | "services" | "projects" | "skills" | "about"

export function AdminPanel() {
  const { portfolioData, updatePortfolioData, isAdminOpen, setIsAdminOpen } = usePortfolio()
  const [activeTab, setActiveTab] = useState<Tab>("hero")
  const [localData, setLocalData] = useState<PortfolioData | null>(null)
  
  // Project editing state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [projectForm, setProjectForm] = useState<ProjectData | null>(null)
  
  // Service editing state
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null)
  const [serviceForm, setServiceForm] = useState<ServiceData | null>(null)

  // Skill Group editing state
  const [editingSkillGroupIndex, setEditingSkillGroupIndex] = useState<number | null>(null)
  const [skillGroupForm, setSkillGroupForm] = useState<SkillGroupData | null>(null)

  // Initialize local data when panel is opened
  React.useEffect(() => {
    if (isAdminOpen) {
      setLocalData(JSON.parse(JSON.stringify(portfolioData)))
      setEditingProjectId(null)
      setEditingServiceIndex(null)
      setEditingSkillGroupIndex(null)
    }
  }, [isAdminOpen, portfolioData])

  if (!isAdminOpen || !localData) return null

  const handleSaveAll = async () => {
    // If editing sub-items, warn or automatically commit them
    let dataToSave = { ...localData }
    
    if (editingProjectId && projectForm) {
      dataToSave.projects = dataToSave.projects.map(p => p.id === editingProjectId ? projectForm : p)
    }
    if (editingServiceIndex !== null && serviceForm) {
      dataToSave.services = dataToSave.services.map((s, idx) => idx === editingServiceIndex ? serviceForm : s)
    }
    if (editingSkillGroupIndex !== null && skillGroupForm) {
      dataToSave.skills = dataToSave.skills.map((sg, idx) => idx === editingSkillGroupIndex ? skillGroupForm : sg)
    }

    const success = await updatePortfolioData(dataToSave)
    if (success) {
      setIsAdminOpen(false)
    }
  }

  // Update nested hero fields
  const handleHeroChange = (key: string, value: any) => {
    setLocalData(prev => {
      if (!prev) return null
      return {
        ...prev,
        hero: {
          ...prev.hero,
          [key]: value
        }
      }
    })
  }

  // Update socials array
  const handleSocialChange = (index: number, field: "platform" | "url", value: string) => {
    setLocalData(prev => {
      if (!prev) return null
      const updated = [...prev.hero.socials]
      updated[index] = { ...updated[index], [field]: value }
      return {
        ...prev,
        hero: {
          ...prev.hero,
          socials: updated
        }
      }
    })
  }

  const addSocialLink = () => {
    setLocalData(prev => {
      if (!prev) return null
      return {
        ...prev,
        hero: {
          ...prev.hero,
          socials: [...prev.hero.socials, { platform: "github", url: "" }]
        }
      }
    })
  }

  const removeSocialLink = (index: number) => {
    setLocalData(prev => {
      if (!prev) return null
      return {
        ...prev,
        hero: {
          ...prev.hero,
          socials: prev.hero.socials.filter((_, idx) => idx !== index)
        }
      }
    })
  }

  // Update nested about fields
  const handleAboutChange = (key: string, value: any) => {
    setLocalData(prev => {
      if (!prev) return null
      return {
        ...prev,
        about: {
          ...prev.about,
          [key]: value
        }
      }
    })
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-end bg-black/70 backdrop-blur-md">
      {/* Backdrop click closer */}
      <div className="absolute inset-0" onClick={() => setIsAdminOpen(false)} />

      {/* Main Sliding Container */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col z-10 shadow-[0_0_50px_rgba(204,0,0,0.15)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0d0d]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="font-bebas text-2xl tracking-widest text-[#ebd4c2]">
              DEVELOPER <span className="text-red-500">ADMIN CONTROL</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsAdminOpen(false)}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex bg-[#0f0f0f] border-b border-white/5 px-4 overflow-x-auto select-none">
          {(["hero", "services", "projects", "skills", "about"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setEditingProjectId(null)
                setEditingServiceIndex(null)
                setEditingSkillGroupIndex(null)
              }}
              className={`px-5 py-3.5 font-bebas text-sm tracking-widest uppercase transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-red-500" : "text-white/40 hover:text-white/80"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabIndicator" 
                  className="absolute bottom-0 left-5 right-5 h-0.5 bg-red-600" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm text-white/70">
          
          {/* ── TAB: HERO ── */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">First Name</label>
                  <input 
                    type="text" 
                    value={localData.hero.firstName} 
                    onChange={e => handleHeroChange("firstName", e.target.value)}
                    className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Last Name</label>
                  <input 
                    type="text" 
                    value={localData.hero.lastName} 
                    onChange={e => handleHeroChange("lastName", e.target.value)}
                    className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Title / Heading</label>
                <input 
                  type="text" 
                  value={localData.hero.title} 
                  onChange={e => handleHeroChange("title", e.target.value)}
                  className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Primary Role</label>
                  <input 
                    type="text" 
                    value={localData.hero.role} 
                    onChange={e => handleHeroChange("role", e.target.value)}
                    className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Bio Role Label</label>
                  <input 
                    type="text" 
                    value={localData.hero.bioRole} 
                    onChange={e => handleHeroChange("bioRole", e.target.value)}
                    className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Sub-Roles Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={localData.hero.subRoles.join(", ")} 
                  onChange={e => handleHeroChange("subRoles", e.target.value.split(",").map(s => s.trim()))}
                  className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Hero Left Quote</label>
                <textarea 
                  rows={2}
                  value={localData.hero.quote} 
                  onChange={e => handleHeroChange("quote", e.target.value)}
                  className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Hero Intro Bio</label>
                <textarea 
                  rows={3}
                  value={localData.hero.bioText} 
                  onChange={e => handleHeroChange("bioText", e.target.value)}
                  className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bebas text-sm text-[#ebd4c2] tracking-wider uppercase">Social Links</h4>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white font-bebas text-xs tracking-wider transition-colors uppercase"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Social Link
                  </button>
                </div>
                <div className="space-y-3">
                  {localData.hero.socials.map((social, i) => (
                    <div key={i} className="flex gap-3 items-end bg-[#0c0c0c] border border-white/5 p-3 rounded">
                      <div className="w-1/4">
                        <label className="block text-[10px] text-white/40 mb-1">Platform (e.g. github, linkedin, twitter, email)</label>
                        <input 
                          type="text" 
                          value={social.platform} 
                          onChange={e => handleSocialChange(i, "platform", e.target.value)}
                          className="w-full bg-[#121010] border border-white/10 px-2 py-1.5 text-white rounded text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] text-white/40 mb-1">URL</label>
                        <input 
                          type="text" 
                          value={social.url} 
                          onChange={e => handleSocialChange(i, "url", e.target.value)}
                          className="w-full bg-[#121010] border border-white/10 px-2 py-1.5 text-white rounded text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSocialLink(i)}
                        className="p-2 border border-white/10 hover:border-red-500/50 hover:text-red-500 rounded text-white/40 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="font-bebas text-sm text-[#ebd4c2] tracking-wider mb-3">STATS ROW</h4>
                <div className="grid grid-cols-3 gap-4">
                  {localData.hero.stats.map((stat, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-[10px] text-white/40 mb-1">Value (e.g. 2+)</label>
                        <input 
                          type="text" 
                          value={stat.value} 
                          onChange={e => {
                            const newStats = [...localData.hero.stats]
                            newStats[i].value = e.target.value
                            handleHeroChange("stats", newStats)
                          }}
                          className="w-full bg-[#121010] border border-white/10 px-2 py-1 text-white rounded text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex-[2]">
                        <label className="block text-[10px] text-white/40 mb-1">Label (e.g. Projects)</label>
                        <input 
                          type="text" 
                          value={stat.label} 
                          onChange={e => {
                            const newStats = [...localData.hero.stats]
                            newStats[i].label = e.target.value
                            handleHeroChange("stats", newStats)
                          }}
                          className="w-full bg-[#121010] border border-white/10 px-2 py-1 text-white rounded text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: SERVICES ── */}
          {activeTab === "services" && (
            <div className="space-y-4">
              {editingServiceIndex === null ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bebas text-base text-[#ebd4c2] tracking-wider">SERVICES CARDS</h3>
                    <button
                      onClick={() => {
                        setEditingServiceIndex(localData.services.length)
                        setServiceForm({ icon: "Code2", title: "NEW SERVICE", desc: "" })
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white font-bebas text-xs tracking-wider transition-colors uppercase"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Service
                    </button>
                  </div>

                  <div className="divide-y divide-white/10 border border-white/10 bg-[#0c0c0c] rounded">
                    {localData.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 hover:bg-white/[0.02] transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-white/30">[{service.icon}]</span>
                            <span className="font-bebas text-base text-white tracking-wide">{service.title}</span>
                          </div>
                          <p className="text-xs text-white/40 mt-1 line-clamp-1">{service.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={index === 0}
                            onClick={() => {
                              const arr = [...localData.services]
                              const temp = arr[index]
                              arr[index] = arr[index - 1]
                              arr[index - 1] = temp
                              setLocalData({ ...localData, services: arr })
                            }}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            disabled={index === localData.services.length - 1}
                            onClick={() => {
                              const arr = [...localData.services]
                              const temp = arr[index]
                              arr[index] = arr[index + 1]
                              arr[index + 1] = temp
                              setLocalData({ ...localData, services: arr })
                            }}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingServiceIndex(index)
                              setServiceForm({ ...service })
                            }}
                            className="px-2.5 py-1 text-xs border border-white/15 hover:border-red-500/50 hover:text-red-500 rounded font-bebas tracking-wide"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              const arr = localData.services.filter((_, idx) => idx !== index)
                              setLocalData({ ...localData, services: arr })
                            }}
                            className="p-1.5 text-white/30 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded space-y-4">
                  <h4 className="font-bebas text-base text-[#ebd4c2] tracking-wider border-b border-white/5 pb-2">
                    {editingServiceIndex === localData.services.length ? "ADD" : "EDIT"} SERVICE
                  </h4>
                  
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase">Title</label>
                    <input
                      type="text"
                      value={serviceForm?.title || ""}
                      onChange={e => setServiceForm(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={serviceForm?.icon || ""}
                        onChange={e => setServiceForm(prev => prev ? { ...prev, icon: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-white/30 mt-1 block">E.g., Code2, Smartphone, Brain, Database, Layers</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase">Description</label>
                    <textarea
                      rows={3}
                      value={serviceForm?.desc || ""}
                      onChange={e => setServiceForm(prev => prev ? { ...prev, desc: e.target.value } : null)}
                      className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setEditingServiceIndex(null)
                        setServiceForm(null)
                      }}
                      className="px-4 py-1.5 border border-white/10 hover:border-white/30 text-white/60 hover:text-white font-bebas text-xs tracking-wider uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (serviceForm) {
                          const arr = [...localData.services]
                          if (editingServiceIndex === arr.length) {
                            arr.push(serviceForm)
                          } else {
                            arr[editingServiceIndex] = serviceForm
                          }
                          setLocalData({ ...localData, services: arr })
                          setEditingServiceIndex(null)
                          setServiceForm(null)
                        }
                      }}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bebas text-xs tracking-wider uppercase"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB: PROJECTS ── */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              {editingProjectId === null ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bebas text-base text-[#ebd4c2] tracking-wider">PROJECTS LIST</h3>
                    <button
                      onClick={() => {
                        const newId = String(localData.projects.length + 1)
                        setEditingProjectId(newId)
                        setProjectForm({
                          id: newId,
                          title: "NEW PROJECT",
                          cat: "FULL STACK",
                          desc: "Short description.",
                          longDesc: "Detailed description.",
                          tags: ["React"],
                          github: "",
                          demo: "",
                          image: "/images/minimalist-productivity-app.jpg"
                        })
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white font-bebas text-xs tracking-wider transition-colors uppercase"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  <div className="divide-y divide-white/10 border border-white/10 bg-[#0c0c0c] rounded">
                    {localData.projects.map((proj, index) => (
                      <div key={proj.id} className="flex items-center justify-between p-3.5 hover:bg-white/[0.02] transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bebas text-xs text-red-500 tracking-wider border border-red-600/20 px-1.5 py-0.5 rounded bg-red-950/20 uppercase">{proj.cat}</span>
                            <span className="font-bebas text-base text-white tracking-wide">{proj.title}</span>
                          </div>
                          <p className="text-xs text-white/40 mt-1 line-clamp-1">{proj.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={index === 0}
                            onClick={() => {
                              const arr = [...localData.projects]
                              const temp = arr[index]
                              arr[index] = arr[index - 1]
                              arr[index - 1] = temp
                              setLocalData({ ...localData, projects: arr })
                            }}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            disabled={index === localData.projects.length - 1}
                            onClick={() => {
                              const arr = [...localData.projects]
                              const temp = arr[index]
                              arr[index] = arr[index + 1]
                              arr[index + 1] = temp
                              setLocalData({ ...localData, projects: arr })
                            }}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingProjectId(proj.id)
                              setProjectForm({ ...proj })
                            }}
                            className="px-2.5 py-1 text-xs border border-white/15 hover:border-red-500/50 hover:text-red-500 rounded font-bebas tracking-wide"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              const arr = localData.projects.filter(p => p.id !== proj.id)
                              setLocalData({ ...localData, projects: arr })
                            }}
                            className="p-1.5 text-white/30 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded space-y-4">
                  <h4 className="font-bebas text-base text-[#ebd4c2] tracking-wider border-b border-white/5 pb-2">
                    {localData.projects.some(p => p.id === editingProjectId) ? "EDIT" : "ADD"} PROJECT
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Title</label>
                      <input
                        type="text"
                        value={projectForm?.title || ""}
                        onChange={e => setProjectForm(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Category</label>
                      <input
                        type="text"
                        value={projectForm?.cat || ""}
                        onChange={e => setProjectForm(prev => prev ? { ...prev, cat: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase">Short Description</label>
                    <input
                      type="text"
                      value={projectForm?.desc || ""}
                      onChange={e => setProjectForm(prev => prev ? { ...prev, desc: e.target.value } : null)}
                      className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase">Long Description</label>
                    <textarea
                      rows={3}
                      value={projectForm?.longDesc || ""}
                      onChange={e => setProjectForm(prev => prev ? { ...prev, longDesc: e.target.value } : null)}
                      className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">GitHub Link</label>
                      <input
                        type="text"
                        value={projectForm?.github || ""}
                        onChange={e => setProjectForm(prev => prev ? { ...prev, github: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Live Demo Link</label>
                      <input
                        type="text"
                        value={projectForm?.demo || ""}
                        onChange={e => setProjectForm(prev => prev ? { ...prev, demo: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Cover Image Path</label>
                      <input
                        type="text"
                        value={projectForm?.image || ""}
                        onChange={e => setProjectForm(prev => prev ? { ...prev, image: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={projectForm?.tags.join(", ") || ""}
                        onChange={e => setProjectForm(prev => prev ? { ...prev, tags: e.target.value.split(",").map(t => t.trim()) } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setEditingProjectId(null)
                        setProjectForm(null)
                      }}
                      className="px-4 py-1.5 border border-white/10 hover:border-white/30 text-white/60 hover:text-white font-bebas text-xs tracking-wider uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (projectForm) {
                          const arr = [...localData.projects]
                          const matchIdx = arr.findIndex(p => p.id === editingProjectId)
                          if (matchIdx > -1) {
                            arr[matchIdx] = projectForm
                          } else {
                            arr.push(projectForm)
                          }
                          setLocalData({ ...localData, projects: arr })
                          setEditingProjectId(null)
                          setProjectForm(null)
                        }
                      }}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bebas text-xs tracking-wider uppercase"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB: SKILLS ── */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              {editingSkillGroupIndex === null ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bebas text-base text-[#ebd4c2] tracking-wider">TECHNICAL SKILLS GROUPS</h3>
                    <button
                      onClick={() => {
                        setEditingSkillGroupIndex(localData.skills.length)
                        setSkillGroupForm({ title: "NEW GROUP", icon: "Layout", skills: [] })
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white font-bebas text-xs tracking-wider transition-colors uppercase"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Group
                    </button>
                  </div>

                  <div className="divide-y divide-white/10 border border-white/10 bg-[#0c0c0c] rounded">
                    {localData.skills.map((group, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 hover:bg-white/[0.02] transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-white/30">[{group.icon}]</span>
                            <span className="font-bebas text-base text-white tracking-wide">{group.title}</span>
                          </div>
                          <p className="text-xs text-white/40 mt-1 line-clamp-1">{group.skills.join(", ")}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={index === 0}
                            onClick={() => {
                              const arr = [...localData.skills]
                              const temp = arr[index]
                              arr[index] = arr[index - 1]
                              arr[index - 1] = temp
                              setLocalData({ ...localData, skills: arr })
                            }}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            disabled={index === localData.skills.length - 1}
                            onClick={() => {
                              const arr = [...localData.skills]
                              const temp = arr[index]
                              arr[index] = arr[index + 1]
                              arr[index + 1] = temp
                              setLocalData({ ...localData, skills: arr })
                            }}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingSkillGroupIndex(index)
                              setSkillGroupForm({ ...group })
                            }}
                            className="px-2.5 py-1 text-xs border border-white/15 hover:border-red-500/50 hover:text-red-500 rounded font-bebas tracking-wide"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              const arr = localData.skills.filter((_, idx) => idx !== index)
                              setLocalData({ ...localData, skills: arr })
                            }}
                            className="p-1.5 text-white/30 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded space-y-4">
                  <h4 className="font-bebas text-base text-[#ebd4c2] tracking-wider border-b border-white/5 pb-2">
                    {editingSkillGroupIndex === localData.skills.length ? "ADD" : "EDIT"} SKILL GROUP
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Group Title</label>
                      <input
                        type="text"
                        value={skillGroupForm?.title || ""}
                        onChange={e => setSkillGroupForm(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={skillGroupForm?.icon || ""}
                        onChange={e => setSkillGroupForm(prev => prev ? { ...prev, icon: e.target.value } : null)}
                        className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-white/30 mt-1 block">E.g. Layout, Server, Smartphone, Database, Cpu</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase">Skills list (comma separated)</label>
                    <textarea
                      rows={3}
                      value={skillGroupForm?.skills.join(", ") || ""}
                      onChange={e => setSkillGroupForm(prev => prev ? { ...prev, skills: e.target.value.split(",").map(t => t.trim()) } : null)}
                      className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setEditingSkillGroupIndex(null)
                        setSkillGroupForm(null)
                      }}
                      className="px-4 py-1.5 border border-white/10 hover:border-white/30 text-white/60 hover:text-white font-bebas text-xs tracking-wider uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (skillGroupForm) {
                          const arr = [...localData.skills]
                          if (editingSkillGroupIndex === arr.length) {
                            arr.push(skillGroupForm)
                          } else {
                            arr[editingSkillGroupIndex] = skillGroupForm
                          }
                          setLocalData({ ...localData, skills: arr })
                          setEditingSkillGroupIndex(null)
                          setSkillGroupForm(null)
                        }
                      }}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bebas text-xs tracking-wider uppercase"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB: ABOUT ── */}
          {activeTab === "about" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Bio Paragraphs (Double Line Breaks to separate)</label>
                <textarea 
                  rows={4}
                  value={localData.about.bioParagraphs.join("\n\n")} 
                  onChange={e => handleAboutChange("bioParagraphs", e.target.value.split("\n\n").map(s => s.trim()).filter(Boolean))}
                  className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-white/40 mb-1.5 uppercase">Red Checkmark Traits (One per line)</label>
                <textarea 
                  rows={4}
                  value={localData.about.traits.join("\n")} 
                  onChange={e => handleAboutChange("traits", e.target.value.split("\n").map(s => s.trim()).filter(Boolean))}
                  className="w-full bg-[#121010] border border-white/10 px-3 py-2 text-white rounded focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="font-bebas text-sm text-[#ebd4c2] tracking-wider mb-3">STATS ROW</h4>
                <div className="grid grid-cols-3 gap-4">
                  {localData.about.stats.map((stat, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-[10px] text-white/40 mb-1">Value (e.g. 2+)</label>
                        <input 
                          type="text" 
                          value={stat.value} 
                          onChange={e => {
                            const newStats = [...localData.about.stats]
                            newStats[i].value = e.target.value
                            handleAboutChange("stats", newStats)
                          }}
                          className="w-full bg-[#121010] border border-white/10 px-2 py-1 text-white rounded text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex-[2]">
                        <label className="block text-[10px] text-white/40 mb-1">Label (e.g. Years Exp)</label>
                        <input 
                          type="text" 
                          value={stat.label} 
                          onChange={e => {
                            const newStats = [...localData.about.stats]
                            newStats[i].label = e.target.value
                            handleAboutChange("stats", newStats)
                          }}
                          className="w-full bg-[#121010] border border-white/10 px-2 py-1 text-white rounded text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="font-bebas text-sm text-[#ebd4c2] tracking-wider mb-2">TOOLS AND TECH STRIP</h4>
                <div className="flex flex-wrap gap-2 mb-3 max-h-36 overflow-y-auto border border-white/10 bg-[#0c0c0c] p-3 rounded">
                  {localData.about.tools.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-[#121010] border border-white/10 rounded px-2.5 py-1 text-xs text-white/80">
                      <img src={tool.icon} alt={tool.name} className="w-3.5 h-3.5 object-contain" />
                      <span>{tool.name}</span>
                      <button 
                        onClick={() => {
                          const list = localData.about.tools.filter((_, i) => i !== idx)
                          handleAboutChange("tools", list)
                        }}
                        className="text-white/30 hover:text-red-500 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3 bg-[#0c0c0c] border border-white/10 p-3 rounded">
                  <div className="flex-1">
                    <input 
                      id="new-tool-name"
                      type="text" 
                      placeholder="Tool name (e.g. Tailwind)"
                      className="w-full bg-[#121010] border border-white/10 px-2 py-1 text-xs text-white rounded focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      id="new-tool-icon"
                      type="text" 
                      placeholder="SimpleIcons slug URL (optional)"
                      className="w-full bg-[#121010] border border-white/10 px-2 py-1 text-xs text-white rounded focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const nameEl = document.getElementById("new-tool-name") as HTMLInputElement
                      const iconEl = document.getElementById("new-tool-icon") as HTMLInputElement
                      if (nameEl && nameEl.value.trim()) {
                        const slug = iconEl.value.trim() || `https://cdn.simpleicons.org/${nameEl.value.trim().toLowerCase().replace(/\s+/g, "")}`
                        const newList = [...localData.about.tools, { name: nameEl.value.trim(), icon: slug }]
                        handleAboutChange("tools", newList)
                        nameEl.value = ""
                        iconEl.value = ""
                      }
                    }}
                    className="px-3.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bebas text-xs tracking-wider uppercase rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-[#0d0d0d]">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2.5 border border-white/15 text-white/60 hover:text-white hover:border-white/30 font-bebas text-sm tracking-widest uppercase transition-all"
          >
            Discard
          </button>
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bebas text-sm tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.25)]"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  )
}

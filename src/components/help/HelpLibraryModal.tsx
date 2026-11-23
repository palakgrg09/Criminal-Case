import React, { useState } from 'react';
import { X, Search, BookOpen, Terminal, ChevronRight, Bookmark, AlertCircle, ArrowLeft } from 'lucide-react';
import { HELP_ARTICLES, REAL_COMMAND_REFERENCES } from '../../data/helpArticlesData';
import { CrimeRibbonSticker, DetectiveEmblem } from '../common/VintageStickers';

interface HelpLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArticleId?: string;
}

export const HelpLibraryModal: React.FC<HelpLibraryModalProps> = ({
  isOpen,
  onClose,
  initialArticleId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    initialArticleId || HELP_ARTICLES[0].id
  );
  const [activeTab, setActiveTab] = useState<'articles' | 'commands'>('articles');

  if (!isOpen) return null;

  const filteredArticles = HELP_ARTICLES.filter(
    art =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCommands = REAL_COMMAND_REFERENCES.filter(
    cmd =>
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeArticle = HELP_ARTICLES.find(a => a.id === selectedArticleId) || HELP_ARTICLES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#f3e9d2] border-4 border-[#654735] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh] text-[#302820]">
        {/* Header (Forest Olive with Old Ivory) */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#515b3a] border-b-2 border-[#302820] text-[#f3e9d2]">
          <div className="flex items-center space-x-3">
            <DetectiveEmblem size={32} />
            <div>
              <h2 className="text-xl font-black font-serif text-[#f3e9d2] tracking-wide">
                CRIMINAL CASE FIELD MANUAL
              </h2>
              <p className="text-xs text-[#e5d5b7] font-medium">
                14 Accredited Forensic Modules // Real Investigative Methods
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Mode Bar */}
        <div className="bg-[#e5d5b7] px-6 py-3 border-b-2 border-[#654735]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-[#654735] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search concepts, commands, Locard's rule, hashing, timestamps..."
              className="w-full bg-white border-2 border-[#654735]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-[#302820] focus:outline-none focus:border-[#515b3a]"
            />
          </div>

          <div className="flex rounded-xl border-2 border-[#654735]/30 bg-white overflow-hidden p-0.5">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 text-xs font-bold flex items-center gap-2 rounded-lg transition cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-[#515b3a] text-white shadow-xs'
                  : 'text-[#654735] hover:text-[#302820]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> 14 Core Guides
            </button>
            <button
              onClick={() => setActiveTab('commands')}
              className={`px-4 py-2 text-xs font-bold flex items-center gap-2 rounded-lg transition cursor-pointer ${
                activeTab === 'commands'
                  ? 'bg-[#515b3a] text-white shadow-xs'
                  : 'text-[#654735] hover:text-[#302820]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> Real Forensic Commands
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'articles' ? (
            <>
              {/* Article Sidebar */}
              <div className="w-80 border-r-2 border-[#dfd2bc] bg-[#f7efe0] overflow-y-auto p-3 space-y-1.5 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786452] px-3 py-1 block">
                  Detective Topics ({filteredArticles.length})
                </span>
                {filteredArticles.map(article => {
                  const isSelected = article.id === selectedArticleId;
                  return (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticleId(article.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition flex items-center justify-between group ${
                        isSelected
                          ? 'bg-[#8b2635] text-white font-bold shadow-sm'
                          : 'text-[#524234] hover:bg-[#ede2cb]'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="truncate">{article.title}</div>
                        <span className={`text-[10px] block font-normal ${isSelected ? 'text-white/80' : 'text-[#786452]'}`}>
                          {article.category}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#8c7662]'}`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Selected Article Detail */}
              <div className="flex-1 p-8 overflow-y-auto bg-[#fcfaf4] space-y-5">
                <div className="border-b-2 border-[#dfd2bc] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#8b2635] text-white text-[10px] font-mono font-bold uppercase">
                      {activeArticle.category}
                    </span>
                    <span className="text-xs text-[#786452] font-semibold">
                      Applied in: Levels {activeArticle.relatedLevels.join(', ')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black font-serif text-[#2c221a] mt-2">
                    {activeArticle.title}
                  </h3>
                </div>

                <div className="bg-[#fffdf9] p-5 rounded-xl border-2 border-[#dfd2bc] shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b2635] mb-2 flex items-center gap-2">
                    <Bookmark className="w-4 h-4" /> Simple & Clear Explanation
                  </h4>
                  <p className="text-sm leading-relaxed text-[#3a2e24]">
                    {activeArticle.explanation}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#2b6cb0] mb-1">
                      Why It Matters In A Case
                    </h5>
                    <p className="text-xs leading-relaxed text-[#524234]">
                      {activeArticle.whyItMatters}
                    </p>
                  </div>

                  <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      When Detectives Use It
                    </h5>
                    <p className="text-xs leading-relaxed text-[#524234]">
                      {activeArticle.whenUsed}
                    </p>
                  </div>
                </div>

                <div className="bg-[#fffdf9] p-4 rounded-xl border-2 border-[#dfd2bc] shadow-xs">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#b7791f] mb-1">
                    Realistic Case Application
                  </h5>
                  <p className="text-xs font-mono text-[#3a2e24] leading-relaxed">
                    {activeArticle.example}
                  </p>
                </div>

                <div className="bg-red-50/80 p-4 rounded-xl border-2 border-red-200">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-red-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-700" /> Common Mistakes To Avoid
                  </h5>
                  <ul className="space-y-1.5 text-xs text-red-950 font-medium">
                    {activeArticle.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-700 font-bold">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* Command Reference */
            <div className="flex-1 p-8 overflow-y-auto bg-[#fcfaf4] space-y-6">
              <div className="border-b-2 border-[#dfd2bc] pb-4">
                <span className="px-2.5 py-0.5 rounded-md bg-[#2b6cb0] text-white text-[10px] font-mono font-bold uppercase">
                  Technical Reference
                </span>
                <h3 className="text-2xl font-black font-serif text-[#2c221a] mt-2">
                  Real Forensic Software & Command Line Reference
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCommands.map(cmd => (
                  <div key={cmd.command} className="bg-white p-4 rounded-xl border-2 border-[#dfd2bc] space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#dfd2bc] pb-2">
                      <span className="font-mono text-sm font-bold text-[#8b2635] bg-[#f7efe0] px-2 py-0.5 rounded-md border border-[#dfd2bc]">
                        {cmd.command}
                      </span>
                      <span className="text-[10px] text-[#786452] uppercase font-bold">Standard Tool</span>
                    </div>

                    <p className="text-xs text-[#524234]">{cmd.description}</p>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#786452]">Usage Syntax:</span>
                      <div className="font-mono text-xs text-[#2b6cb0] bg-[#f8f2e4] p-2 rounded-lg mt-1 font-bold">
                        {cmd.usage}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#786452]">Output Example:</span>
                      <pre className="font-mono text-[11px] text-[#2c221a] bg-[#f8f2e4] p-2.5 rounded-lg mt-1 overflow-x-auto border border-[#dfd2bc]">
                        {cmd.output}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#f4ebd7] border-t-2 border-[#dfd2bc] flex justify-between items-center text-xs">
          <span className="text-[#786452] font-mono">Criminal Case Investigation Manual</span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 bg-[#8b2635] hover:bg-[#a83244] text-white font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Case
          </button>
        </div>
      </div>
    </div>
  );
};

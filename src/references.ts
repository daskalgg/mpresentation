// Bibliography entries from thesis/references.bib, listed in order of first citation in the deck.
export type Reference = {
    key: string;
    text: string;
};

export const references: Reference[] = [
    { key: 'blauert1997spatial', text: 'J. Blauert, Spatial Hearing: The Psychophysics of Human Sound Localization. MIT Press, 1997.' },
    { key: 'buildings4020113', text: 'S. Pelzer, L. Aspöck, D. Schröder, M. Vorländer, "Integrating Real-Time Room Acoustics Simulation into a CAD Modeling Software to Enhance the Architectural Design Process," Buildings, 2014.' },
    { key: 'naylor1993odeon', text: 'G. M. Naylor, "ODEON — Another hybrid room acoustical model," Applied Acoustics, 1993.' },
    { key: 'funkhouser2003survey', text: 'T. Funkhouser, N. Tsingos, J.-M. Jot, "Survey of methods for modeling sound propagation in interactive virtual environment systems," Presence: Teleoperators and Virtual Environments, 2003.' },
    { key: 'lakka2018spatial', text: 'E. Lakka, A. G. Malamos, K. G. Pavlakis, J. A. Ware, "Spatial sound rendering — a survey," IJIMAI, 2018.' },
    { key: 'stamoulias2015wrapping', text: 'A. Stamoulias, E. Lakka, A. Malamos, "“Wrapping” X3DOM around Web Audio API," IJIMAI, 2015.' },
    { key: 'lakka2021x3d', text: 'E. Lakka, M. Papadaki, D. Brutzman, R. Puk, A. G. Malamos, "X3D Audio Graph for the consistent declarative representation of the W3C Audio API," in Proc. 26th Int. Conf. on 3D Web Technology, 2021.' },
    { key: 'lesar2018real', text: 'Ž. Lesar, C. Bohak, M. Marolt, "Real-time interactive platform-agnostic volumetric path tracing in WebGL 2.0," in Proc. 23rd Int. ACM Conf. on 3D Web Technology, 2018.' },
    { key: 'klein2020directional', text: 'J. Klein, "Directional room impulse response measurement," Ph.D. thesis, 2020.' },
    { key: 'schroeder1962computers', text: 'M. Schroeder, "Computers in room acoustics," in Proc. 4th ICA, 1962.' },
    { key: 'forster2008auralization', text: 'M. Forster, "Auralization in room acoustics," Graz University of Technology, 2008.' },
    { key: 'acoustics5020022', text: 'A. G. Prinn, "A Review of Finite Element Methods for Room Acoustics," Acoustics, 2023.' },
    { key: 'buildings12020105', text: 'T. Yoshida, T. Okuzono, K. Sakagami, "A Parallel Dissipation-Free and Dispersion-Optimized Explicit Time-Domain FEM for Large-Scale Room Acoustics Simulation," Buildings, 2022.' },
    { key: 'aliabadi2002boundary', text: 'M. H. Aliabadi, The Boundary Element Method, Vol. 2: Applications in Solids and Structures. John Wiley & Sons, 2002.' },
    { key: '4438007', text: 'S. Adams, J. Payne, R. Boppana, "Finite Difference Time Domain (FDTD) Simulations Using Graphics Processors," in DoD HPCMP Users Group Conference, 2007.' },
    { key: 'savioja2010real', text: 'L. Savioja, "Real-time 3D finite-difference time-domain simulation of low- and mid-frequency room acoustics," in 13th Int. Conf. on Digital Audio Effects (DAFx), 2010.' },
    { key: 'savioja2015overview', text: 'L. Savioja, U. P. Svensson, "Overview of geometrical room acoustic modeling techniques," J. Acoust. Soc. Am., 2015.' },
    { key: 'vorlander2020fundamentals', text: 'M. Vorländer, "Fundamentals of acoustics," in Auralization: Fundamentals of Acoustics, Modelling, Simulation, Algorithms and Acoustic Virtual Reality. Springer, 2020.' },
    { key: 'KROKSTAD1968118', text: 'A. Krokstad, S. Strøm, S. Sørsdal, "Calculating the acoustical room response by the use of a ray tracing technique," J. Sound and Vibration, 1968.' },
    { key: 'taylor2012guided', text: 'M. Taylor, A. Chandak, Q. Mo, C. Lauterbach, C. Schissler, D. Manocha, "Guided multiview ray tracing for fast auralization," IEEE Trans. Visualization and Computer Graphics, 2012.' },
    { key: 'perez2018ambisonics', text: 'A. Pérez-López, J. De Muynke, "Ambisonics directional room impulse response as a new convention of the spatially oriented format for acoustics," in AES Convention 144, 2018.' },
    { key: 'begault2010applying', text: 'D. Begault, E. M. Wenzel, M. Godfroy, J. D. Miller, M. R. Anderson, "Applying spatial audio to human interfaces: 25 years of NASA experience," in AES 40th Int. Conf.: Spatial Audio, 2010.' },
    { key: 'zotkin2003hrtf', text: 'D. N. Zotkin, J. Hwang, R. Duraiswami, L. S. Davis, "HRTF personalization using anthropometric measurements," in IEEE WASPAA, 2003.' },
    { key: 'furness1990ambisonics', text: 'R. K. Furness, "Ambisonics — an overview," in AES 8th Int. Conf.: The Sound of Audio, 1990.' },
    { key: 'frank2015producing', text: 'M. Frank, F. Zotter, A. Sontacchi, "Producing 3D audio in ambisonics," in AES 57th Int. Conf.: The Future of Audio Entertainment Technology, 2015.' },
    { key: 'furse2009building', text: 'R. W. Furse, "Building an OpenAL implementation using ambisonics," in AES 35th Int. Conf.: Audio for Games, 2009.' },
    { key: 'ouellet2021live', text: 'E. Ouellet-Delorme, H. Venkatesan, E. Durand, N. Bouillot, "Live ray tracing and auralization of 3D audio scenes with vaRays," 2021.' },
    { key: 'picaut2012simpa', text: 'J. Picaut, N. Fortin, "I-Simpa, a graphical user interface devoted to host 3D sound propagation numerical codes," in Acoustics 2012, 2012.' },
    { key: 'picaut2012spps', text: 'J. Picaut, N. Fortin, "SPPS, a particle-tracing numerical code for indoor and outdoor sound propagation prediction," in Acoustics 2012, 2012.' },
];

export function refIndex(key: string): number {
    const i = references.findIndex((r) => r.key === key);
    if (i < 0) throw new Error(`Unknown reference: ${key}`);
    return i + 1;
}
